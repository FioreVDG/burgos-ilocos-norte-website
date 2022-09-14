import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TourismService } from './../../services/tourism/tourism.service';
import { Component, OnInit } from '@angular/core';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss'],
})
export class TourismComponent implements OnInit {
  touristSpots: any = [];
  loading: boolean = false;
  search: string = '';
  searching: boolean = false;

  activeIndex: number = 0;
  maxIndex: number;
  constructor(
    private tourist: TourismService,
    private dbx: DropboxService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.tourist.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.touristSpots = res.env.tourist_spots;
      this.maxIndex = this.touristSpots;
      this.touristSpots.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
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
  showMore(data: any) {
    console.log(data);
    data.type = 'Tourism';
    this.dialog.open(ViewerComponent, {
      minWidth: '100vw',
      height: '100%',
      data: data,
      panelClass: 'dialog-no-padding',
    });
  }

  onSearch() {
    console.log(this.search);
    let query;
    if (this.search === 'All')
      query = {
        find: [],
      };
    else
      query = {
        find: [
          {
            field: 'type',
            operator: '=',
            value: this.search,
          },
        ],
      };
    this.searching = true;
    this.tourist.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.touristSpots = res.env.tourist_spots;
      this.touristSpots.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.searching = false;
    });
  }
}
