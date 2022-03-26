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
    public dialogRef: MatDialogRef<ViewTransparencyComponent>
  ) {}

  ngOnInit(): void {
    console.log(this.data);
    this.data.description = this.stringToHTMLConverter(this.data.description);
  }

  stringToHTMLConverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }
}
