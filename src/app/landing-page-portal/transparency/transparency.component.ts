import { QueryParams } from './../../models/queryparams.interface';
import { PageEvent } from '@angular/material/paginator';
import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { ViewTransparencyComponent } from './view-transparency/view-transparency.component';
import { MatDialog } from '@angular/material/dialog';
import { TransparencyService } from './../../services/transparency/transparency.service';
import { Component, OnInit } from '@angular/core';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TourismService } from 'src/app/services/tourism/tourism.service';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})
export class TransparencyComponent implements OnInit {
  transparencies: any = [];
  loading: boolean = false;
  searching: boolean = false;
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  types: any = [
    { type: 'All', selected: true },
    { type: 'Annual Budget', selected: false },
    { type: 'Full Disclosure Policy', selected: false },
    { type: 'Annual Investment Plan', selected: false },
    { type: 'Programs and Projects', selected: false },
    { type: 'Awards and Recognition', selected: false },
    { type: 'Annual Procurement Plan', selected: false },
  ];

  headerBackground: any;
  constructor(
    private transparency: TransparencyService,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private tourist: TourismService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  async fetchData() {
    this.loading = true;

    if (!this.tourist.getTourismData()) {
      await this.tourist.populateTouristData();
    }
    const randomTouristSpot = this.tourist.getRandomTourismData();
    this.headerBackground = await this.getTempLink(
      randomTouristSpot?.image?.path_display
    );
    this.transparency.getAll({}).subscribe((res: any) => {
      // console.log(res);
      this.transparencies = res.env.transparencies;
      this.pagination.totalDocuments = res.total_docs;
      this.transparencies.forEach(async (el: any) => {
        el.selected = false;
        el.files.forEach(async (f: any) => {
          f.url = await this.getTempLink(f.file.path_display);
        });
      });
      this.loading = false;
    });
  }

  findType(type: string) {
    // console.log(type);
    this.searching = true;
    for (let i of this.types) {
      i.selected = false;
    }
    let query;
    if (type === 'All')
      query = {
        find: [],
        limit: this.pagination.pageSize,
        page: this.pagination.pageNumber,
      };
    else
      query = {
        find: [
          {
            field: 'transparencyType',
            operator: '=',
            value: type,
          },
        ],
        limit: this.pagination.pageSize,
        page: this.pagination.pageNumber,
      };

    let find: any = this.types.find((o: any) => o.type === type);
    if (find) find.selected = true;

    this.transparency.getAll(query).subscribe((res: any) => {
      this.transparencies = res.env.transparencies;
      this.pagination.totalDocuments = res.total_docs;
      this.transparencies.forEach((el: any) => {
        el.files.forEach(async (e: any) => {
          e.url = await this.getTempLink(e.file.path_display);
        });
      });
      this.searching = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    let findSelected = this.types.find((o: any) => o.selected === true);
    const query: QueryParams = {
      find: [
        {
          field: 'transparencyType',
          operator: '=',
          value: findSelected.type,
        },
      ],
    };

    this.searching = true;
    this.transparency.getAll(query).subscribe((res: any) => {
      // console.log(res);
      this.transparencies = res.env.transparencies;
      this.pagination.totalDocuments = res.total_docs;
      this.transparencies.forEach((el: any) => {
        el.files.forEach(async (f: any) => {
          f.url = await this.getTempLink(f.file.path_display);
        });
      });
      this.searching = false;
    });
  }

  viewTransparency(view: any) {
    // console.log(view);
    this.dialog.open(ViewTransparencyComponent, {
      height: 'auto',
      width: '100%',
      data: view,
    });
  }

  async getTempLink(data: any) {
    // console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  openSelectedFile(url: any, ext: any) {
    this.dialog.open(FileViewerComponent, {
      width: '100%',
      height: '100%',
      data: { url: url, ext: ext },
    });
  }
}
