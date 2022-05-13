import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { BidService } from './../../services/bid/bid.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bids-awards',
  templateUrl: './bids-awards.component.html',
  styleUrls: ['./bids-awards.component.scss'],
})
export class BidsAwardsComponent implements OnInit {
  bids: any = [];
  loading: boolean = false;
  constructor(
    private bid: BidService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.bid.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.bids = res.env.bidsawards;
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

  search() {
    // this.
  }

  openFile(url: string, ext: any) {
    this.dialog.open(FileViewerComponent, {
      width: '100%',
      height: '90%',
      data: { url: url, ext: ext },
    });
  }
}
