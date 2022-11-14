import { DocViewerComponent } from './doc-viewer/doc-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { CitizenCharterService } from './../../services/citizen-charter/citizen-charter.service';
import { Component, OnInit } from '@angular/core';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-citizen-charter',
  templateUrl: './citizen-charter.component.html',
  styleUrls: ['./citizen-charter.component.scss'],
})
export class CitizenCharterComponent implements OnInit {
  citizens: any = [];
  loading: boolean = false;
  constructor(
    private citizen: CitizenCharterService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchCitizen();
  }

  fetchCitizen() {
    this.citizen.getAll({}).subscribe((res: any) => {
      this.citizens = res.env.citizen_charters;
      this.citizens.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el.file.path_display);
      });
      // console.log(this.citizens);
      this.loading = false;
    });
  }

  async getTempLink(data: any) {
    // console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  viewFile(str: any) {
    // console.log(str);
    this.dialog.open(DocViewerComponent, {
      width: '100%',
      height: '90%',
      data: str,
    });
  }
}
