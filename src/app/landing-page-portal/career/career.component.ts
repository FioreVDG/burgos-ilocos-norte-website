import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career/career.service';
import { QueryParams } from 'src/app/models/queryparams.interface';

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
  constructor(private career: CareerService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.career.getAll({}).subscribe((res: any) => {
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
}
