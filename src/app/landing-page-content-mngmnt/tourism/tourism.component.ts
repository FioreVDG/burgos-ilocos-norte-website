import { AddTourismComponent } from './add-tourism/add-tourism.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { TourismService } from 'src/app/services/tourism/tourism.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss'],
})
export class TourismComponent implements OnInit {
  tourisms: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;

  constructor(
    private tourism: TourismService,
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
    this.tourism.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.tourisms = res.env.tourist_spots;
      this.pagination.totalDocuments = res.total_docs;
      this.tourisms.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.loading = false;
      console.log(this.tourisms);
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

    this.tourism.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.tourisms = res.env.tourist_spots;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  onDelete(id: any) {
    console.log(id);
    let message = 'Deleting Tourist Spot';
    this._showSnackBar(message);
    this.tourism.delete(id).subscribe(
      () => {
        message = 'Announcement successfully deleted!';
        this.fetchData();
        this._showSnackBar(message, 'Okay');
      },
      (err) => {
        console.error(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  addTouristSpot() {
    this.dialog
      .open(AddTourismComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  onUpdateTouristSpot(event: any) {
    console.log(event);
    this.dialog
      .open(AddTourismComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: event,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('p');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
