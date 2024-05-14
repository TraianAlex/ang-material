import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map, catchError } from 'rxjs';

import { environment } from 'src/environments/environment';

interface GoogleSpreadsheetsResponse {
  values: string[][];
}

@Injectable({
  providedIn: 'root',
})
export class GsService {
  private http = inject(HttpClient);

  getRawData$ = (sheetName: string) => {
    const apiUrl = `${environment.gsEndPoint}/${environment.gsSheetId}/values/${sheetName}?key=${environment.gsApiKey}`;
    return this.http.get<GoogleSpreadsheetsResponse>(apiUrl).pipe(
      map((response: any) => {
        return response.values;
      }),
      catchError(this.handleError)
    );
  }

  getSheetData$ = (sheetName: string) => {
    const apiUrl = `${environment.gsEndPoint}/${environment.gsSheetId}/values/${sheetName}?key=${environment.gsApiKey}`;
    return this.http.get<GoogleSpreadsheetsResponse>(apiUrl).pipe(
      map((response: any) => {
        const values = response.values;
        if (!values || values.length < 2) {
          return [];
        }
        return this.rowsToObjects(values);
      }),
      catchError(this.handleError)
    );
  }

  // range: A1:D6 => obj, C1:C3 => obj
  getSheetDataByRange$ = (sheetName: string, from: string, to: string) => {
    this.isHeader(from);
    const apiUrl = `${environment.gsEndPoint}/${environment.gsSheetId}/values/${sheetName}!${from}:${to}?key=${environment.gsApiKey}`;
    return this.http.get<GoogleSpreadsheetsResponse>(apiUrl).pipe(
      map((response: any) => {
        const values = response.values;
        if (!values || values.length < 2) {
          return [];
        }
        return this.rowsToObjects(values);
      }),
      catchError(this.handleError)
    );
  }

  // range: H3:H3 => string, H5 => string
  public getOneCell(sheetName: string, cell: string) {
    this.isOneCell(cell);
    const apiUrl = `${environment.gsEndPoint}/${environment.gsSheetId}/values/${sheetName}!${cell}?key=${environment.gsApiKey}`;
    return this.http.get<GoogleSpreadsheetsResponse>(apiUrl).pipe(
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something bad happened; please try again later.');
  }
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
