import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertModalData } from 'src/app/models/alert-modal.interface';

@Component({
  selector: 'app-alert-are-you-sure',
  templateUrl: './alert-are-you-sure.component.html',
  styleUrls: ['./alert-are-you-sure.component.scss'],
})
export class AlertAreYouSureComponent implements OnInit {
  title: string = '';
  message: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: AlertModalData) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }
}
