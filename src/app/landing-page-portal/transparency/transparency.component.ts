import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { ViewTransparencyComponent } from './view-transparency/view-transparency.component';
import { MatDialog } from '@angular/material/dialog';
import { TransparencyService } from './../../services/transparency/transparency.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})
export class TransparencyComponent implements OnInit {
  transparencies: any = [];
  loading: boolean = false;
  newArr: any = [];
  constructor(
    private transparency: TransparencyService,
    private dialog: MatDialog,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.transparency.getByType().subscribe((res: any) => {
      console.log(res);
      this.transparencies = res.env.transparency;
      this.transparencies.forEach((el: any) => {
        el.content.forEach(async (con: any) => {
          con.fileUrl = await this.getTempLink(con?.file?.path_display);
        });
      });
      console.log(this.transparencies);
      this.loading = false;
    });
  }

  viewTransparency(view: any) {
    console.log(view);
    this.dialog.open(ViewTransparencyComponent, {
      height: 'auto',
      width: '100%',
      data: view,
    });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }
}
