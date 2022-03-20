import { AnnouncementService } from './../../services/announcement/announcement.service';

import { Component, OnInit } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { Announcement } from 'src/app/models/api/announcement-service.interface';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  loading: boolean = false;
  announcements: Array<Announcement> = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  constructor(private announcement: AnnouncementService) {}

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
    this.announcement.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.announcements = res.env.announcements;
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

    this.announcement.getAll(query).subscribe((res) => {
      console.log(res);
      this.announcements = res.env.announcements;
      this.pagination.totalDocuments = res.total_docs;
    });
  }
}
