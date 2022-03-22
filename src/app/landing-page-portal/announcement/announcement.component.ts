import { ViewAnnouncementComponent } from './view-announcement/view-announcement.component';
import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from './../../services/dropbox/dropbox.service';
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
  constructor(
    private announcement: AnnouncementService,
    private dbx: DropboxService,
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
    this.announcement.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.announcements = res.env.announcements;
      this.pagination.totalDocuments = res.total_docs;
      this.announcements.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el.image?.path_display);
      });
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

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  readMore(event: any) {
    console.log(event);
    this.dialog.open(ViewAnnouncementComponent, {
      height: 'auto',
      width: '60%',
      data: event,
    });
  }
}
