import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
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
  constructor(private tourist: TourismService, private dbx: DropboxService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.tourist.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.touristSpots = res.env.tourist_spots;
      this.touristSpots.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
      });
      this.loading = false;
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
}
