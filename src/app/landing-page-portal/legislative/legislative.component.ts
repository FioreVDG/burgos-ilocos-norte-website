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
  search: string = '';
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

  onSearch() {
    console.log(this.search);
    let query;
    if (this.search === 'All')
      query = {
        find: [],
      };
    else
      query = {
        find: [
          {
            field: 'legislativeType',
            operator: '=',
            value: this.search,
          },
        ],
      };
    this.loading = true;
    this.legislative.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.legislatives = res.env.legislatives;
      this.legislatives.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.imgUrl = await this.getTempLink(el.file.path_display);
      });
      this.loading = false;
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
}
