import { AnnouncementService } from './../../services/announcement/announcement.service';
import { AddAnnouncememntComponent } from './add-announcememnt/add-announcememnt.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.scss'],
})
export class AnnouncementComponent implements OnInit {
  announcementArr: any = [];

  constructor(
    private dialog: MatDialog,
    private announcement: AnnouncementService
  ) {}

  ngOnInit(): void {
    this.announcement.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.announcementArr = res.env.announcement;
      console.log(this.announcementArr);
    });
  }

  addAnnouncement() {
    this.dialog.open(AddAnnouncememntComponent, {
      width: '100%',
      height: 'auto',
      // disableClose: true,
    });
  }
}
