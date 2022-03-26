import { ViewTransparencyComponent } from './view-transparency/view-transparency.component';
import { MatDialog } from '@angular/material/dialog';
import { TransparencyService } from './../../services/transparency/transparency.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transparency',
  templateUrl: './transparency.component.html',
  styleUrls: ['./transparency.component.scss'],
})
export class TransparencyComponent implements OnInit {
  transparencies: any = [];
  loading: boolean = false;
  constructor(
    private transparency: TransparencyService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchTransparency();
  }

  fetchTransparency() {
    this.transparency.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.transparencies = res.env.transparencies;
      this.loading = false;
    });
  }

  viewTransparency(view: any) {
    console.log(view);
    this.dialog.open(ViewTransparencyComponent, {
      width: 'auto',
      height: 'auto',
      data: view,
    });
  }
}
