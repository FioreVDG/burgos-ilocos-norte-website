import { MatDialog } from '@angular/material/dialog';
import { LegislativeService } from './../../services/legislative/legislative.service';
import { Component, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { PageEvent } from '@angular/material/paginator';
import { AddLegislativeComponent } from './add-legislative/add-legislative.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-legislative',
  templateUrl: './legislative.component.html',
  styleUrls: ['./legislative.component.scss'],
})
export class LegislativeComponent implements OnInit {
  legislatives: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;

  constructor(
    private legislative: LegislativeService,
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
    this.legislative.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.legislatives = res.env.legislatives;
      this.pagination.totalDocuments = res.total_docs;
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

    this.legislative.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.legislatives = res.env.legislatives;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  onUpdateLegislative(event: any) {
    console.log(event);
    this.dialog
      .open(AddLegislativeComponent, {
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
    let message = 'Deleting legislative';
    this._showSnackBar(message);
    this.legislative.delete(id).subscribe(
      () => {
        message = 'Announcement successfully deleted!';
        this.fetchData();
        this._showSnackBar(message, 'Okay');
      },
      (err) => {
        console.error(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  addLegislative() {
    this.dialog
      .open(AddLegislativeComponent, {
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
