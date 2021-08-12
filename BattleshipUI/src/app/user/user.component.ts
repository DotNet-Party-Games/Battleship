import { Component, OnInit, ViewChild } from '@angular/core';
import { IUser } from './user';
import { UserapiService } from '../userapi.service';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  users: IUser[];
  displayedColumns: string[] = ['username', 'email', 'registerDate', 'edit', 'delete'];
  dataSource: MatTableDataSource<IUser>;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private UserApi:UserapiService) { 
    this.users = new Array<IUser>();
    this.sort = new MatSort();
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit(): void 
  {
    this.getAllUser();
    this.dataSource = new MatTableDataSource(Array.from(this.users));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  getAllUser()
  {
    this.UserApi.getAllUser().subscribe(
      (response) => {
        this.users = response;
      }
    )
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  
}
