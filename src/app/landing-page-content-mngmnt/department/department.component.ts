import { AddDepartmentComponent } from './add-department/add-department.component';
import { QueryParams } from './../../models/queryparams.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DepartmentService } from 'src/app/services/department/department.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
})
export class DepartmentComponent implements OnInit {
  departments: Array<any> = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private department: DepartmentService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };
    this.department.getAll(query).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.loading = false;
        this.departments = res.env.departments;
        this.pagination.totalDocuments = res.total_docs;
      }
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };

    this.department.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.departments = res.env.departments;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  addDepartment() {
    this.dialog
      .open(AddDepartmentComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          this.fetchData();
        }
      });
  }

  updateDepartment(department: any) {
    console.log(department);
    this.dialog
      .open(AddDepartmentComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: department,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  deleteDepartment(id: any) {
    let msg = 'Deleting department...';
    this._showSnackBar(msg);
    this.department.delete(id).subscribe(
      () => {
        msg = 'Department successfully deleted!';
        this.fetchData();
        this._showSnackBar(msg, 'Okay');
      },
      (err) => {
        console.error(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
