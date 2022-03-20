import { QueryParams } from './../../models/queryparams.interface';
import { AnnouncementService } from './../../services/announcement/announcement.service';
import { AddAnnouncememntComponent } from './add-announcememnt/add-announcememnt.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Announcement } from 'src/app/models/api/announcement-service.interface';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  announcements: Array<Announcement> = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;

  constructor(
    private dialog: MatDialog,
    private announcement: AnnouncementService
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
    this.announcement.getAll(query).subscribe((res) => {
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

  markAsPinned(id: string) {
    this.loading = true;
    this.announcement.markAsPinned(id).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.fetchData();
          // this.loading = false;
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addAnnouncement() {
    this.dialog
      .open(AddAnnouncememntComponent, {
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
}
