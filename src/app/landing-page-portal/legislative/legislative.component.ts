import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { LegislativeService } from './../../services/legislative/legislative.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from 'src/app/models/queryparams.interface';

@Component({
  selector: 'app-legislative',
  templateUrl: './legislative.component.html',
  styleUrls: ['./legislative.component.scss'],
})
export class LegislativeComponent implements OnInit {
  legislatives: any = [];
  loading: boolean = false;
  search: string = '';
  searching: boolean = false;
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  constructor(
    private legislative: LegislativeService,
    private dbx: DropboxService,
    private dialog: MatDialog
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
      this.pagination.totalDocuments = res.total_docs;
      this.legislatives.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.imgUrl = await this.getTempLink(el.file.path_display);
      });

      console.log(this.legislatives);
    });
  }

  preview(url: string, ext: string) {
    this.dialog.open(FileViewerComponent, {
      width: '100%',
      height: '100%',
      data: { url: url, ext: ext },
    });
  }

  onSearch() {
    console.log(this.search);
    let query;
    if (this.search === 'All')
      query = {
        find: [],
        limit: this.pagination.pageSize,
        page: this.pagination.pageNumber,
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
        limit: this.pagination.pageSize,
        page: this.pagination.pageNumber,
      };
    this.searching = true;
    this.legislative.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.legislatives = res.env.legislatives;
      this.pagination.totalDocuments = res.total_docs;
      this.legislatives.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.imgUrl = await this.getTempLink(el.file.path_display);
      });
      this.searching = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;
    let query;

    if (this.search === '')
      query = {
        find: [],
      };
    else
      query = {
        find: [
          {
            field: 'type',
            operator: '=',
            value: this.search,
          },
        ],
      };
    this.searching = true;
    this.legislatives.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.legislatives = res.env.legislatives;
      this.pagination.totalDocuments = res.total_docs;
      this.legislatives.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el.file.path_display);
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
}
