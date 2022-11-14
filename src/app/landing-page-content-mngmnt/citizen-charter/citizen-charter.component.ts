import { AddCitizenCharterComponent } from './add-citizen-charter/add-citizen-charter.component';
import { QueryParams } from './../../models/queryparams.interface';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CitizenCharterService } from 'src/app/services/citizen-charter/citizen-charter.service';

@Component({
  selector: 'app-citizen-charter',
  templateUrl: './citizen-charter.component.html',
  styleUrls: ['./citizen-charter.component.scss'],
})
export class CitizenCharterComponent implements OnInit {
  @ViewChild('divID') divID: ElementRef;
  citizenCharters: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;
  sample: any;

  constructor(
    private citizen: CitizenCharterService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }
  html: any;
  fetchData() {
    this.loading = true;
    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };
    this.citizen.getAll(query).subscribe((res: any) => {
      // console.log(res);
      this.citizenCharters = res.env.citizen_charters;
      this.pagination.totalDocuments = res.total_docs;
      let temp: any = this.stringToHTMLconverter(
        this.citizenCharters[0].description
      );
      this.html = temp;
      // console.log(temp);
      this.loading = false;
    });
  }

  stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  onPageChange(event: any) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };

    this.citizen.getAll(query).subscribe((res: any) => {
      // console.log(res);
      this.citizenCharters = res.env.citizen_charters;
      this.pagination.totalDocuments = res.total_docs;
    });
  }
  onUpdateCitizenCharter(event: any) {
    // console.log(event);
    this.dialog
      .open(AddCitizenCharterComponent, {
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

  onDelete(id: any) {
    // console.log(id);
    let message = 'Deleting legislative';
    this._showSnackBar(message);
    this.citizen.delete(id).subscribe(
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

  addCitizenCharter() {
    this.dialog
      .open(AddCitizenCharterComponent, {
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
}
