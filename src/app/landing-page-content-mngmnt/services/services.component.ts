import { ServiceService } from './../../services/service/service.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { AddServiceComponent } from './add-service/add-service.component';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  services: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;
  constructor(
    private service: ServiceService,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
    this.service.getAll({}).subscribe(
      (res: any) => {
        console.log(res);
        this.services = res.env.services;
        this.pagination.totalDocuments = res.total_docs;
        // this.services.forEach(async(el:any)=>{
        //   el.imgUrl = await this.getTempLink(el.file.path_display);
        // })
        this.loading = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };

    this.services.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.services = res.env.services;
      this.pagination.totalDocuments = res.total_docs;
      // this.newsArr.forEach(async (el: any) => {
      //   el.imgUrl = await this.getTempLink(el?.image?.path_display);
      //   el.layout = await this.stringToHTMLconverter(el.description);
      // });
    });
  }

  addService() {
    this.dialog
      .open(AddServiceComponent, {
        width: 'auto',
        height: 'auto',
        disableClose: true,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  updateService(service: any) {
    console.log(service);
    this.dialog
      .open(AddServiceComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: service,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  deleteService(id: string) {
    let msg = 'Deleting Service...';

    this._showSnackBar(msg);
    this.service.delete(id).subscribe(
      () => {
        msg = 'Service successfully deleted!';
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

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }
}
