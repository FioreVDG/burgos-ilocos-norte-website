import { MatDialog } from '@angular/material/dialog';
import { LegislativeService } from './../../services/legislative/legislative.service';
import { Component, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { PageEvent } from '@angular/material/paginator';
import { AddLegislativeComponent } from './add-legislative/add-legislative.component';

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
    private dialog: MatDialog
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
  }

  onDelete(event: any) {
    console.log(event);
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
}
