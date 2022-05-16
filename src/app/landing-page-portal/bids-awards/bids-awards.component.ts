import { QueryParams } from './../../models/queryparams.interface';
import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { BidService } from './../../services/bid/bid.service';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bids-awards',
  templateUrl: './bids-awards.component.html',
  styleUrls: ['./bids-awards.component.scss'],
})
export class BidsAwardsComponent implements OnInit {
  bids: any = [];
  loading: boolean = false;
  search: string = '';
  searching: boolean = false;
  bidTypes: any = [
    { type: 'All', selected: true },
    { type: 'Invitation to Bid', selected: false },
    { type: 'Request for Quotation', selected: false },
    { type: 'Notice of Award', selected: false },
    { type: 'Notice to Proceed', selected: false },
  ];
  isBidSelected: boolean = false;
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  constructor(
    private bid: BidService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };
    this.bid.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.bids = res.env.bidsawards;
      this.pagination.totalDocuments = res.total_docs;
      this.bids.forEach((el: any) => {
        el.files.forEach(async (f: any) => {
          f.url = await this.getTempLink(f.file.path_display);
        });
      });
      this.loading = false;
      console.log(this.bids);
    });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  openSelectedFile(url: any, ext: any) {
    console.log(url);
    console.log(ext);
    this.dialog.open(FileViewerComponent, {
      width: '100%',
      height: '90%',
      data: { url: url, ext: ext },
    });
  }

  findType(type: string) {
    console.log(type);
    for (let i of this.bidTypes) {
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
            field: 'type',
            operator: '=',
            value: type,
          },
        ],
        limit: this.pagination.pageSize,
        page: this.pagination.pageNumber,
      };
    this.searching = true;
    let find: any = this.bidTypes.find((o: any) => o.type === type);
    if (find) find.selected = true;

    if (find.type === 'Invitation to Bid') this.isBidSelected = true;
    else this.isBidSelected = false;

    this.bid.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.bids = res.env.bidsawards;
      this.pagination.totalDocuments = res.total_docs;
      this.bids.forEach((el: any) => {
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

    let findSelected: any = this.bidTypes.find((o: any) => o.selected === true);
    const query: QueryParams = {
      find: [
        {
          field: 'type',
          operator: '=',
          value: findSelected.type,
        },
      ],
    };

    this.searching = true;
    this.bid.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.bids = res.env.bidsawards;
      this.pagination.totalDocuments = res.total_docs;
      this.bids.forEach((el: any) => {
        el.files.forEach(async (e: any) => {
          e.url = await this.getTempLink(e.file.path_display);
        });
      });
      this.searching = false;
    });
  }
}
