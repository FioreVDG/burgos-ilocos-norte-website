import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-announcement',
  templateUrl: './view-announcement.component.html',
  styleUrls: ['./view-announcement.component.scss'],
})
export class ViewAnnouncementComponent implements OnInit {
  p = [];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewAnnouncementComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);

    let split = this.data.description.split('.');
    console.log(split);
    this.p = split;
  }
}
