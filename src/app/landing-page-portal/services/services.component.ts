import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from './../../services/service/service.service';
import { Component, OnInit } from '@angular/core';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  loading: boolean = false;
  services: any = [];
  constructor(
    private service: ServiceService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.service.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.services = res.env.services;
      console.log(this.services);
      this.loading = false;
      this.services.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.tempFile = await this.getTempLink(el?.file?.path_display);
      });
    });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.className = '.legislative-content';
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  openFile(url: string, ext: any) {
    console.log(url);
    this.dialog.open(FileViewerComponent, {
      height: '90%',
      width: '100%',
      data: { url: url, ext: ext },
    });
  }
}
