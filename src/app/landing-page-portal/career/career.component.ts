import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { CareerService } from 'src/app/services/career/career.service';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TourismService } from 'src/app/services/tourism/tourism.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

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
  headerBackground: any;
  constructor(
    private career: CareerService,
    private dbx: DropboxService,
    private tourist: TourismService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.loading = true;
    if (!this.tourist.getTourismData()) {
      await this.tourist.populateTouristData();
    }
    const randomTouristSpot = this.tourist.getRandomTourismData();
    this.headerBackground = await this.getTempLink(
      randomTouristSpot?.image?.path_display
    );
    this.career.getAll({}).subscribe((res: any) => {
      // console.log(res);
      this.loading = false;
      this.careers = res.env.careers;
      this.pagination.totalDocuments = res.total_dcs;
    });
  }
  async getTempLink(data: any) {
    // console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
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
      // console.log(res);
      this.careers = res.env.careers;
      this.pagination.totalDocuments = res.total_docs;
    });
  }
}
