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
  constructor(private transparency: TransparencyService) {}

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
}
