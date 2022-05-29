import { DropboxService } from './../../services/dropbox/dropbox.service';
import { AddTransparencyComponent } from './add-transparency/add-transparency.component';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from './../../models/queryparams.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransparencyService } from 'src/app/services/transparency/transparency.service';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})
export class TransparencyComponent implements OnInit {
  transparencies: Array<any> = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;
  constructor(
    private transparency: TransparencyService,
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
    this.transparency.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.transparencies = res.env.transparencies;
      this.pagination.totalDocuments = res.total_docs;
      console.log(this.transparencies);
      this.transparencies.forEach((el: any) => {
        el.files.forEach(async (f: any) => {
          f.url = await this.getTempLink(f.file.path_display);
        });
      });
      this.loading = false;
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
    this.transparency.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.transparencies = res.env.transparencies;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  onUpdateTransparency(transparency: Object) {
    this.dialog
      .open(AddTransparencyComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: transparency,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  onDelete(id: any) {
    console.log(id);
    let message = 'Deleting legislative';
    this._showSnackBar(message);
    this.transparency.delete(id).subscribe(
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

  addTransparency() {
    this.dialog
      .open(AddTransparencyComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }
}
