import { Component, OnInit } from '@angular/core';

import { fillerContent } from './../../data/content-data';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.scss'],
})
export class MessageListComponent implements OnInit {
  contents!: string[];

  ngOnInit(): void {
    this.contents = fillerContent;
  }
}
