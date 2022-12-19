import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ELEMENT_DATA, OrderType } from './mock-data';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
})
export class OrderListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['action', 'orderNumber', 'orderDate', 'description', 'total', 'actions'];
  dataSource = new MatTableDataSource<OrderType>(ELEMENT_DATA);
  // dataSource!: MatTableDataSource<OrderType>;

  // length = 17;
  // pageIndex = 0;
  // pageSize = 10;
  pageSizeOptions = [5, 10, 20];

  // pageEvent!: PageEvent;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {}

  ngOnInit() {
    //this.loadData(0, this.pageSize);
    // this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selectAll() {
    for (let elm of ELEMENT_DATA) {
      elm.isChecked = !elm.isChecked;
    }
  }

  deleteOrder(el: OrderType) {
    console.log('el removed: ', el);
  }

  // loadData(pageIndex: number, pageSize: number) {
  //   this.dataSource = new MatTableDataSource<OrderType>(ELEMENT_DATA.slice(pageIndex, pageIndex + pageSize));
  // }

  // onPageChange(e: PageEvent) {
  //   this.pageIndex = e.pageIndex;
  //   this.pageSize = e.pageSize;
  //   this.loadData(this.pageIndex, this.pageSize);
  // }
}
