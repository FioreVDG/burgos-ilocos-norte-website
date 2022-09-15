import { MatDialog } from '@angular/material/dialog';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { TourismService } from './../../services/tourism/tourism.service';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';
import { QueryParams } from 'src/app/models/queryparams.interface';

@Component({
  selector: 'app-tourism',
  templateUrl: './tourism.component.html',
  styleUrls: ['./tourism.component.scss'],
})
export class TourismComponent implements OnInit, AfterViewInit {
  touristSpots: any = [];
  loading: boolean = false;
  search: string = '';
  searching: boolean = false;

  maxIndex: number;

  touristSpotsHeroPage: any = [];
  activeIndex: number;

  loop: any;

  interval: number = 300;

  @ViewChild('searchSpots') searchSpots: ElementRef;

  constructor(
    private tourist: TourismService,
    private dbx: DropboxService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  ngAfterViewInit(): void {}

  heroSectionCarousel() {
    this.loop = setInterval(() => {
      // console.log(this.activeIndex);
      this.activeIndex = this.randomizedIndex();
      // console.log(this.activeIndex);

      this.cdr.detectChanges();
    }, 1000 * 20);
  }

  randomizedIndex(): any {
    let generated = Math.floor(0 + Math.random() * (this.maxIndex - 1 - 0));

    if (generated === this.activeIndex) return this.randomizedIndex();
    else return generated;
  }

  onGeoInfoChange(action: string) {
    const maxLength = this.touristSpotsHeroPage.length;
    switch (action) {
      case 'prev':
        if (this.activeIndex - 1 < 0) {
          this.activeIndex = maxLength - 1;
        } else this.activeIndex -= 1;

        break;
      case 'next':
        if (this.activeIndex + 1 === maxLength) {
          this.activeIndex = 0;
        } else this.activeIndex += 1;

        break;
    }
    // console.log(this.selectedGeoIndex);
    this.cdr.detectChanges();
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
      this.maxIndex = this.touristSpots.length;
      this.activeIndex = this.randomizedIndex();

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
        this.cdr.detectChanges();
        this.loading = false;
        this.heroSectionCarousel();
      }, 100);
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
