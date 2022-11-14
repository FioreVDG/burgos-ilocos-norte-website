import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-transparency',
  templateUrl: './view-transparency.component.html',
  styleUrls: ['./view-transparency.component.scss'],
})
export class ViewTransparencyComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ViewTransparencyComponent>,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    // console.log(this.data);
    this.data.content.forEach(async (el: any) => {
      el.files = await this.getTempLink(el?.file?.path_display);
      el.layout = await this.stringToHTMLConverter(el?.description);
    });
    // console.log(this.data);
  }

  stringToHTMLConverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  async getTempLink(data: any) {
    // console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }
}
