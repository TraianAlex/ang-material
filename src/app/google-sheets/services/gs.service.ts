import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';

import { environment } from '@env/environment';

interface GoogleSpreadsheetsResponse {
  values: string[][];
}

@Injectable({
  providedIn: 'root',
})
export class GsService {
  private http = inject(HttpClient);
  defaultActiveValues: any[] = ['true', '1', 'yes'];

  /*
   * Returns all the data from a sheet.
   * The data is converted to an array of custom objects using attribute mapping.
   * @param spreadsheetId: The id of the spreadsheet.
   * @param worksheetName: The name of the worksheet.
   * @param attributesMapping: An object with the attributes as keys and the column names as values.
   * @returns An array of objects.
   * @throws Error if the first segment is not the first row.
   *
   * @example get('Sheet1', { name: 'A', age: 'B' }).subscribe(console.log);
   */
  get<T>(spreadsheetId: string, worksheetName: string, attributesMapping: object | string[]): Observable<T[]> {
    return this.getRawData$(spreadsheetId, worksheetName).pipe(
      map((rows: string[][]) =>
        this.rowsToObjects(rows).map((entry: object) => this.getObjectFromEntry(entry, attributesMapping) as T)
      )
    );
  }

  /*
   * Returns all the active data from a sheet.
   * The data is converted to an array of custom objects using attribute mapping.
   * @param spreadsheetId: The id of the spreadsheet.
   * @param worksheetName: The name of the worksheet.
   * @param attributesMapping: An object with the attributes as keys and the column names as values.
   * @param isActiveColumnName: The name of the column that indicates if the row is active.
   * @param activeValues: The values that indicate that the row is active.
   * @returns An array of objects.
   * @throws Error if the first segment is not the first row.
   *
   * @example getActive('Sheet1', { name: 'A', age: 'B' }, 'is_active', ['true', '1', 'yes']).subscribe(console.log);
   * @example getActive('Sheet1', ['name', 'age'], 'is_active', ['true', '1', 'yes']).subscribe(console.log);
   * @example getActive('Sheet1', { name: 'A', age: 'B' }, 'Active').subscribe(console.log);
   */
  getActive<T>(
    spreadsheetId: string,
    worksheetName: string,
    attributesMapping: object | string[],
    isActiveColumnName: string = 'is_active',
    activeValues: string[] | string = null as any
  ): Observable<T[]> {
    if (activeValues === null) {
      activeValues = this.defaultActiveValues;
    } else if (!Array.isArray(activeValues)) {
      activeValues = [activeValues];
    }
    return this.getRawData$(spreadsheetId, worksheetName).pipe(
      map((rows: string[][]) =>
        this.rowsToObjects(rows)
          .filter((obj: object | any) => activeValues.includes(obj[isActiveColumnName].toLowerCase()))
          .map((entry: object) => this.getObjectFromEntry(entry, attributesMapping) as T)
      )
    );
  }

  /*
   * Gets the data from a worksheet.
   * The data is converted to an array of objects, column is the key and row cell the value.'
   * @param spreadsheetId: The id of the spreadsheet.
   * @param sheetName: The name of the worksheet.
   * @returns An array of objects.
   */
  getSheetData$ = (spreadsheetId: string, sheetName: string) => {
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, sheetName);
    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map((response: any) => {
        const values = response.values;
        if (!values || values.length < 2) {
          return [];
        }
        return this.rowsToObjects(values);
      }),
      catchError(this.handleError)
    );
  };

  /*
   * Gets the data from a worksheet.
   * The data is converted to an array of objects, column is the key and row cell the value.'
   * @param spreadsheetId: The id of the spreadsheet.
   * @param sheetName: The name of the worksheet.
   * @param from: The first cell of the range.
   * @param to: The last cell of the range.
   * @returns An array of objects.
   * @throws Error if the first segment is not the first row.
   *
   * @example getSheetDataByRange$('Sheet1', 'A1', 'D6').subscribe(console.log);
   * range: A1:D6 => obj, C1:C3 => obj
   */
  getSheetDataByRange$ = (spreadsheetId: string, sheetName: string, from: string, to: string) => {
    this.isHeader(from);
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, sheetName, from, to);
    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map((response: any) => {
        const values = response.values;
        if (!values || values.length < 2) {
          return [];
        }
        return this.rowsToObjects(values);
      }),
      catchError(this.handleError)
    );
  };

  /*
   * Gets the data from a worksheet.
   * @param spreadsheetId: The id of the spreadsheet.
   * @param sheetName: The name of the worksheet.
   * @param cell: The cell.
   * @returns The value of the cell.
   * @throws Error if the cell is not a single cell.
   *
   * @example getOneCell('Sheet1', 'H3').subscribe(console.log);
   * range: H3:H3 => string, H5 => string
   */
  getOneCell(spreadsheetId: string, sheetName: string, cell: string) {
    this.isOneCell(cell);
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, sheetName, cell);
    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map((response: any) => {
        const values = response.values;
        if (!values) {
          return [];
        } else if (values.length < 2) {
          return values[0][0];
        }
      }),
      catchError(this.handleError)
    );
  }

  /*
   * Returns all the data from a sheet. (should make private)
   * @param spreadsheetId: The id of the spreadsheet.
   * @param sheetName: The name of the worksheet.
   * @returns An array of arrays.
   * @throws Error if the first segment is not the first row.
   *
   * @example getRawData$('Sheet1').subscribe(console.log);
   */
  getRawData$ = (spreadsheetId: string, sheetName: string) => {
    const spreadsheetUrl = this.getSpreadsheetUrl(spreadsheetId, sheetName);
    return this.http.get<GoogleSpreadsheetsResponse>(spreadsheetUrl).pipe(
      map((response: any) => {
        return response.values;
      }),
      catchError(this.handleError)
    );
  };

  private getSpreadsheetUrl(spreadsheetId: string, worksheetName: string, cell = '', to = ''): string {
    const baseApiUrl = `${environment.gsEndPoint}/${spreadsheetId}/values/${encodeURI(worksheetName)}`;
    if (cell && to) {
      return `${baseApiUrl}!${cell}:${to}?key=${environment.gsApiKey}`;
    } else if (cell) {
      return `${baseApiUrl}!${cell}?key=${environment.gsApiKey}`;
    } else {
      return `${baseApiUrl}?key=${environment.gsApiKey}`;
    }
  }

  // check if the cell is a single cell
  // for range (one cell): H3:H3 => string or H5 => string
  private isOneCell(range: string) {
    const target = range.split(':');
    if ([...target].includes(':') === false || target[0] === target[1]) {
      return true;
    } else {
      throw new Error('Select only one cell');
    }
  }

  // check if the first segment is the first row
  private isHeader(from: string) {
    if (!from || from.length < 2) {
      throw new Error('Wrong cell format!');
    }
    const cellIndex = from.length === 2 ? from[1] : from[2];
    if (cellIndex === '1') {
      return true;
    } else {
      throw new Error('First segment has to be first row!');
    }
  }

  /*
   * Converts an array of arrays to an array of objects.
   * The first row is the header.
   */
  private rowsToObjects(rows: string[][]): object[] {
    const columns: Array<string> = rows[0].map(this.cleanColumnName);
    return rows.slice(1).map((row: Array<string>) =>
      columns.reduce((entry: Record<string, string>, columnName: string, idx: number) => {
        entry[columnName] = row.length > idx ? row[idx] : '';
        return entry;
      }, {})
    );
  }

  private cleanColumnName(columnName: string): string {
    return columnName.trim();
  }

  /*
   * Converts an array of strings to an object.
   * The key and the value are the same.
   */
  private arrayToObject(array: string[]): object {
    return array.reduce((acc: Record<string, string>, cur) => {
      acc[cur] = cur;
      return acc;
    }, {});
  }
  /*
   * Converts an array of strings to an object.
   * The first element of the array is the key, the second is the value.
   */
  private getObjectFromEntry(entry: object, attributesMapping: object | string[]): unknown {
    if (Array.isArray(attributesMapping)) {
      attributesMapping = this.arrayToObject(attributesMapping);
    }

    return this.getObjectFromEntryObject(entry, attributesMapping);
  }

  /*
   * Converts an object to another object.
   * The key is the attribute name and the value is the column name.
   */
  private getObjectFromEntryObject(
    entry: object,
    attributesMapping: object | any,
    columnNamePrefix: string = ''
  ): object {
    const obj: object | any = {};
    for (const attr in Object(attributesMapping)) {
      if (attributesMapping.hasOwnProperty(attr) && !['_prefix', '_listField'].includes(attr)) {
        if (typeof attributesMapping[attr] === 'string') {
          obj[attr] = this.getValueFromEntry(entry, columnNamePrefix + attributesMapping[attr]);
        } else if (typeof attributesMapping[attr] === 'object') {
          let columnName = '';
          if (attributesMapping[attr].hasOwnProperty('_prefix')) {
            columnName = attributesMapping[attr]._prefix;
          }

          if (attributesMapping[attr]._listField) {
            obj[attr] = this.getListFromEntry(entry, columnNamePrefix + columnName);
          } else {
            obj[attr] = this.getObjectFromEntryObject(entry, attributesMapping[attr], columnNamePrefix + columnName);
          }
        } else {
          console.log(`Unknown type for ${attr}`);
        }
      }
    }

    return obj;
  }

  /*
   * Returns the value of an attribute from an object.
   */
  private getValueFromEntry(entry: object | any, attribute: string): string {
    attribute = this.cleanColumnName(attribute);
    if (entry.hasOwnProperty(attribute)) {
      return entry[attribute];
    } else {
      return null as any;
    }
  }

  /*
   * Returns a list of values from an object.
   */
  private getListFromEntry(entry: object, attribute: string): string[] {
    const list: string[] = [];

    let i = 1;
    let curElement: string = this.getValueFromEntry(entry, `${attribute}${i}`);
    while (curElement) {
      list.push(curElement);
      i++;
      curElement = this.getValueFromEntry(entry, `${attribute}${i}`);
    }

    return list;
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
}

// The attributesMapping maps the Google spreadsheet columns to to your outcome object.
// For example, the Google spreadsheet column Email Address is mapped to the outcome object attribute email.
export const characterAttributesMapping = {
  id: 'ID',
  name: 'Name',
  email: 'Email Address',
  contact: {
    _prefix: 'Contact ',
    street: 'Street',
    streetNumber: 'Street Number',
    zip: 'ZIP',
    city: 'City',
  },
  skills: {
    _prefix: 'Skill ',
    _listField: true,
  },
};

export interface Character {
  id: string;
  name: string;
  email: string;
  contact: {
    street: string;
    streetNumber: string;
    zip: string;
    city: string;
  };
  skills: string[];
}

// const keys = values[0]; // First row as keys
// const data = [];
// for (let i = 1; i < values.length; i++) {
//   const item = {} as any;
//   for (let j = 0; j < keys.length; j++) {
//     item[keys[j]] = values[i][j];
//   }
//   data.push(item);
// }
// return data;

/*
Google Sheets

    Create a Google Sheet:
        The first row must be the header.
        The following rows are your entries, one entry per row.
        You may have an active column, with which you can enable or disable rows/entries.
        A Google Sheets demo spreadsheet is available here.
    Share your sheet:
        [File] → [Share] → On the bottom of the modal at "Get Link" click [Change to anyone with the link] to be "Viewer".
        Get the Spreadsheet ID (i.e. 1gSc_7WCmt-HuSLX01-Ev58VsiFuhbpYVo8krbPCvvqA): It is part of the Google spreadsheet URL.
        Get the Sheet Name: The name of the worksheet can be found at the bottom of your Google spreadsheet.
    Optional: It may be a good idea to enable 2-Step Verification for your Google account, if you have not done it yet 😉.

  Google Cloud Platform (GCP)

  A good overview guide is the Get started as a Workspace developer.

    Create a new project in the Google Cloud Console.
    Enable Google Sheets API: [APIs & Services] → [Enable APIs and Services] → Search for "Google Sheets API" → [ENABLE].
    Create an API key: [APIs & Services] → [Credentials] → [+ CREATE CREDENTIALS] → [API key] → [RESTRICT KEY] 
      → In "Application restrictions" choose "HTTP referrers (web sites)" with "Website restrictions" and in 
      "API restrictions" choose "Restrict key" and select "Google Sheets API" → [SAVE].
    Get the generated API key.

    Nested objects
      contact is an example of a nested object. You may define a _prefix as a prefix for all columns of the nested
      object. Please note that the _prefix may need a trailing whitespace.
    Lists
      skills is an example of a list. You need to set _listField and a _prefix for all columns of the list.
      In this example, all columns starting with _Skill _ and an increasing number are part of the list, i.e. 
      Skill 1, Skill 2, etc. Please note that the _prefix may need a trailing whitespace.

    Get "active" rows from the Google spreadsheet as an Observable of objects or a given type as type variable T. 
    You may have an active column with name isActiveColumnName, with which you can enable or disable rows/entries. 
    "Active" rows have the value true, 1 or yes. You may also define your own activeValues.
*/
