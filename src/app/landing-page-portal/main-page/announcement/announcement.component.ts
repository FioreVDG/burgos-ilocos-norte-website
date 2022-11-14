import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { AnnouncementService } from './../../../services/announcement/announcement.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  announcements: any = [];
  featuredAnnouncement: any;
  featuredImage: any;
  featuredDesc: any;
  loading: boolean = false;
  constructor(
    public router: Router,
    private announcement: AnnouncementService,
    private dbx: DropboxService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
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
      if (this.announcements.length > 4) {
        this.announcements.length = 4;
      }
      this.loading = false;
      // console.log(this.featuredAnnouncement);
      // console.log(this.announcements);
      // console.log(this.featuredImage);
    });
  }

  async getTempLink(data: any) {
    const respone = await this.dbx.getTempLink(data).toPromise();
    return respone.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('p');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  showMore(data: any) {
    // console.log(data);
    this.dialog.open(ViewerComponent, {
      minWidth: '100vw',
      height: '100%',
      data: data,
      panelClass: 'dialog-no-padding',
    });
  }
}
