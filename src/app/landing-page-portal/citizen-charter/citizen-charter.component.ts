import { CitizenCharterService } from './../../services/citizen-charter/citizen-charter.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-citizen-charter',
  templateUrl: './citizen-charter.component.html',
  styleUrls: ['./citizen-charter.component.scss'],
})
export class CitizenCharterComponent implements OnInit {
  citizens: any = [];
  loading: boolean = false;
  constructor(private citizen: CitizenCharterService) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchCitizen();
  }

  fetchCitizen() {
    this.citizen.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.citizens = res.env.citizens_charter;
    });
  }
}
