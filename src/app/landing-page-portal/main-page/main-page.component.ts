import { QueryParams } from './../../models/queryparams.interface';
import { AnnouncementService } from './../../services/announcement/announcement.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare let google: any;
import { OwlOptions } from 'ngx-owl-carousel-o';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
import { MAYOR_MSG } from './mayor-config';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  isMobile: boolean = false;
  pinnedAnnouncement: any;
  loading: boolean = false;
  @ViewChild('top') top!: ElementRef;

  @ViewChild('vid') vid: any;
  faChevronCircleUp = faChevronCircleUp;
  element: any;
  mayorConf = MAYOR_MSG;
  missions: any = [
    'Industrialization;',
    'Tourism;',
    'Agriculture;',
    'Environmental management and disaster resilience;',
    'People empowerment; and',
    'Institutional development',
  ];

  windowScrolled: boolean = false;

  bubblesArr: any = [];
  video = '../../../assets/images/BURGOS-BG-VID.mp4';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: true,
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
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  vmayor = [
    {
      section: `Vice Mayor's Message`,
      img: `../../../assets/images/vice-mayor-img.jpg`,
      messages: [
        `In support to the implementation of the Anti-Red Tape Act, a Charter of the Local Government of Burgos, Ilocos Norte was created.`,
        `May I salute the Citizen’s Charter Implementation Team (CCIT) for painstakingly formulated, scrutinized, and edited the said Charter.`,
        `Hopefully, with the prominent display of this document in every office, the clienteles will be guided properly so that unnecessary delay in the delivery of frontline services in the LGU will be eliminated. After all, they deserve the best.`,
      ],
      name: `HON. RODOLFO L. GARCIA`,
      position: 'Municipal Vice Mayor',
    },
  ];

  constructor(
    private announcement: AnnouncementService,
    public bo: BreakpointObserver
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.initMap();
    let word = 'bubble';
    for (let i = 0; i <= 49; i++) {
      this.bubblesArr.push(word);
    }
    let query: QueryParams = {
      find: [
        {
          field: 'isPinned',
          operator: '[ne]=',
          value: false,
        },
      ],
    };
    this.announcement.getAll(query).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          // this.loading = false;
          this.pinnedAnnouncement = res.env.announcements[0];
          console.log(this.pinnedAnnouncement);
        }
      },
      (err) => {
        console.log(err);
        // this.loading = false;
      }
    );
    this.bo
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
  }
  initMap(): void {
    // The location of sanNicolas
    const burgos = { lat: 18.516111, lng: 120.646111 };
    // The map, centered at burgos
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 12,
        center: burgos,
      }
    );

    // The marker, positioned at burgos
    const marker = new google.maps.Marker({
      position: burgos,
      map: map,
    });
  }

  //FOR AUTOSCROLLING ON SELECTED ROUTES
  doSomething(event: any) {
    switch (event) {
      case 'about-us':
        this.scrollToLocation(event);
        break;

      case 'news':
        this.scrollToLocation(event);
        break;
    }
  }

  scrollToLocation(loc: any) {
    this.element = document.getElementById(loc);
    this.element.scrollIntoView();
  }
}
