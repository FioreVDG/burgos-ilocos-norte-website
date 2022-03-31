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
  announcements: Array<any> = [];
  featuredAnnouncement: any;
  featuredImage: any;
  featuredDesc: any;
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
    this.announcement.getAll({}).subscribe(async (res: any) => {
      this.announcements = res.env.announcements;
      this.announcements.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.featuredAnnouncement = this.announcements.find(
        (o: any) => o.isPinned === true
      );
      this.featuredImage = await this.getTempLink(
        this.featuredAnnouncement?.image?.path_display
      );
      this.featuredDesc = await this.stringToHTMLconverter(
        this.featuredAnnouncement?.description
      );
      this.announcements = this.announcements.filter(
        (o: any) => o.isPinned === false
      );
      this.loading = false;
      console.log(this.featuredAnnouncement);
      console.log(this.announcements);
      console.log(this.featuredImage);
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

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('p');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }
}
