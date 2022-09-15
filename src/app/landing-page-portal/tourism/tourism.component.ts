import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TourismService } from './../../services/tourism/tourism.service';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss'],
})
export class TourismComponent implements OnInit {
  touristSpots: any = [];
  touristSpotsHeroPage: any = [];
  loading: boolean = false;
  search: string = '';
  searching: boolean = false;

  activeIndex: number = 0;
  maxIndex: number;

  @ViewChild('searchSpots') searchSpots: ElementRef;

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 10000,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 3,
    navText: ['', ''],
    items: 1,
    nav: false,
  };

  constructor(
    private tourist: TourismService,
    private dbx: DropboxService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  scrollToSearchSpots() {
    this.searchSpots.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
  }

  async fetchData() {
    this.loading = true;
    this.tourist.getAll({}).subscribe((res: any) => {
      // console.log(res);
      this.touristSpots = res.env.tourist_spots;
      this.maxIndex = this.touristSpots;

      this.touristSpots.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });

      setTimeout(() => {
        this.touristSpotsHeroPage = JSON.parse(
          JSON.stringify(this.touristSpots)
        );

        this.touristSpotsHeroPage.forEach(async (el: any) => {
          el.layout = await this.stringToHTMLconverter(el.description, true);
        });

        // console.log(this.touristSpotsHeroPage);

        this.loading = false;
      }, 1000);
    });
  }

  async getTempLink(data: any) {
    // console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  async stringToHTMLconverter(str: any, specialCase: boolean = false) {
    // console.log(specialCase);
    let dom = document.createElement('p');
    dom.innerHTML = str;
    dom.style.cssText = 'color: white !important;';

    if (specialCase) {
      return `<div class="text-white">${dom.textContent || ''}</div>`;
    }

    return dom.textContent || dom.innerText || '';
  }

  showMore(data: any) {
    // console.log(data);
    data.type = 'Tourism';
    this.dialog.open(ViewerComponent, {
      minWidth: '100vw',
      height: '100%',
      data: data,
      panelClass: 'dialog-no-padding',
    });
  }

  onSearch() {
    // console.log(this.search);
    let query: QueryParams = {
      find: [],
    };

    if (this.search !== 'All') {
      query.find = [
        {
          field: 'type',
          operator: '=',
          value: this.search,
        },
      ];
    }

    this.searching = true;
    this.tourist.getAll(query).subscribe((res: any) => {
      // console.log(res);

      this.touristSpots = res.env.tourist_spots;
      this.touristSpots.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.searching = false;
    });
  }
}
