import { AddBidsComponent } from './add-bids/add-bids.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { BidService } from 'src/app/services/bid/bid.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-bids',
  templateUrl: './bids.component.html',
  styleUrls: ['./bids.component.scss'],
})
export class BidsComponent implements OnInit {
  bids: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;
  constructor(
    private bid: BidService,
    private dialog: MatDialog,
    private sb: MatSnackBar,
    private dbx: DropboxService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };
    this.bid.getAll(query).subscribe((res: any) => {
      this.bids = res.env.bidsawards;
      this.loading = false;
      console.log(res);
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };

    this.bid.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.bids = res.env.bidsawards;
      this.pagination.totalDocuments = res.total_docs;
      // this.newsArr.forEach(async (el: any) => {
      //   el.imgUrl = await this.getTempLink(el?.image?.path_display);
      //   el.layout = await this.stringToHTMLconverter(el.description);
      // });
    });
  }

  addBids() {
    this.dialog
      .open(AddBidsComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  updateBids(bid: any) {
    console.log(bid);
    this.dialog
      .open(AddBidsComponent, { width: '100%', height: 'auto', data: bid })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  deleteBid(id: string) {
    let msg = 'Bids & Awards...';

    this._showSnackBar(msg);
    this.bid.delete(id).subscribe(
      () => {
        msg = 'Bids & Awards successfully deleted!';
        this.fetchData();
        this._showSnackBar(msg, 'Okay');
      },
      (err) => {
        console.log(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
