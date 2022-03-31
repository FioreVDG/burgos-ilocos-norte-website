import { Router } from '@angular/router';
import { TourismService } from './../../../services/tourism/tourism.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { MatDialog } from '@angular/material/dialog';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';

@Component({
  selector: 'app-where-to-go',
  templateUrl: './where-to-go.component.html',
  styleUrls: ['./where-to-go.component.scss'],
})
export class WhereToGoComponent implements OnInit {
  touristSpots: any[];
  loading: boolean = false;
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    margin: 25,
    autoplay: true,
    navSpeed: 700,
    navText: [
      '<i class="bi bi-caret-left-fill"></i>',
      '<i class="bi bi-caret-right-fill"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 3,
      },
    },
    nav: false,
  };
  constructor(
    private dbx: DropboxService,
    private tourist: TourismService,
    public router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.tourist.getAll({}).subscribe((res: any) => {
      console.log(res);
      if (res) {
        this.touristSpots = res.env.tourist_spots;
        this.touristSpots.forEach(async (el: any) => {
          el.imgUrl = await this.getTempLink(el?.image?.path_display);
          el.layout = await this.stringToHTMLconverter(el.description);
        });
        console.log(this.touristSpots);
        this.loading = false;
      }
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

  imageLoaded(index: number) {
    this.touristSpots[index].loaded = true;
  }

  showMore(data: any) {
    console.log(data);
    this.dialog.open(ViewerComponent, {
      minWidth: '100vw',
      height: '100%',
      data: data,
      panelClass: 'dialog-no-padding',
    });
  }
}
