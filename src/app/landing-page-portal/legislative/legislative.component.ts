import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { LegislativeService } from './../../services/legislative/legislative.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legislative',
  templateUrl: './legislative.component.html',
  styleUrls: ['./legislative.component.scss'],
})
export class LegislativeComponent implements OnInit {
  legislatives: any = [];
  loading: boolean = false;
  constructor(
    private legislative: LegislativeService,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchLegislatives();
  }

  fetchLegislatives() {
    this.legislative.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.legislatives = res.env.legislatives;
      this.legislatives.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.imgUrl = await this.getTempLink(el.file.path_display);
      });
    });
    console.log(this.legislatives);
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
}
