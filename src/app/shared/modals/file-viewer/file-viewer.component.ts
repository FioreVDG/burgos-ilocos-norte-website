import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-file-viewer',
  templateUrl: './file-viewer.component.html',
  styleUrls: ['./file-viewer.component.scss'],
})
export class FileViewerComponent implements OnInit {
  extension: any;
  isLoaded: boolean = false;
  img = ['jpg', 'jpeg', 'png'];
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<FileViewerComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    // this.extension = this.data.ext.split('.')[1];
    // console.log(this.extension);
  }
  imageLoaded() {
    console.log('ssss');
    this.isLoaded = true;
  }
}
