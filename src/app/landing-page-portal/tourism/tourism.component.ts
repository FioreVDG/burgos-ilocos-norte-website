import { TourismService } from './../../services/tourism/tourism.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss'],
})
export class TourismComponent implements OnInit {
  touristSpots: any = [];
  loading: boolean = false;
  constructor(private tourist: TourismService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.tourist.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.touristSpots = res.env.tourist_spots;
      this.loading = false;
    });
  }
}
