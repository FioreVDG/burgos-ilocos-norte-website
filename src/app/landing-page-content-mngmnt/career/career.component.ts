import { QueryParams } from './../../models/queryparams.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CareerService } from 'src/app/services/career/career.service';
import { PageEvent } from '@angular/material/paginator';
import { AddCareerComponent } from './add-career/add-career.component';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.scss'],
})
export class CareerComponent implements OnInit {
  careers: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;

  constructor(
    private career: CareerService,
    private dialog: MatDialog,
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
    this.career.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.careers = res.env.careers;
      this.pagination.totalDocuments = res.total_dcs;
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

    this.career.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.careers = res.env.careers;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  onUpdateCareer(event: any) {
    console.log(event);
    this.dialog
      .open(AddCareerComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: event,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  onDelete(id: any) {
    console.log(id);
    let message = 'Deleting Career';
    this._showSnackBar(message);
    this.career.delete(id).subscribe(
      () => {
        message = 'Career successfully deleted!';
        this.fetchData();
        this._showSnackBar(message, 'Okay');
      },
      (err) => {
        console.error(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  addCareer() {
    this.dialog
      .open(AddCareerComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
