import { AddBidsComponent } from './add-bids/add-bids.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { BidService } from 'src/app/services/bid/bid.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

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
      this.loading = false;
      console.log(res);
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
}
