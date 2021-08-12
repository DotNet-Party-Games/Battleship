import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {
  columns:string[] = [];
  rows:string[] = [];

  constructor() { }

  ngOnInit() {
    let gridSize = 10;
    for(let i = 0; i < gridSize; i++) {
      this.columns.push("" + i);
    }
    for(let i = 0; i < gridSize; i++) {
      this.rows.push("" + i);
    }
  }

  log(column:string, row:string) {
    alert("Column " + column + " and Row " + row);
  }
}
