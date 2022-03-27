import { QueryParams } from './../../models/queryparams.interface';
import { AnnouncementService } from './../../services/announcement/announcement.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
declare let google: any;
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { faChevronCircleUp } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  pinnedAnnouncement: any;
  loading: boolean = false;
  @ViewChild('top') top!: ElementRef;

  @ViewChild('vid') vid: any;
  faChevronCircleUp = faChevronCircleUp;
  element: any;
  missions: any = [
    'Industrialization;',
    'Tourism;',
    'Agriculture;',
    'Environmental management and disaster resilience;',
    'People empowerment; and',
    'Institutional development',
  ];
  _publicServants = [
    {
      img: '../../../assets/images/profile-sample.jpg',
      name: 'Virgilio L. De Guzman Jr.',
      position: 'Vice Mayor',
      proposition: '"An apple a day, keeps the doctor away"',
    },
    {
      img: '../../../assets/images/profile-sample-2.jpg',
      name: 'Trafalgar D. Law',
      position: 'Councilor',
      proposition: `"You can't bring back what you've lost, focus on what you have"`,
    },
    {
      img: '../../../assets/images/profile-sample.jpg',
      name: 'Portgas D. Ace',
      position: 'Brgy. Captain',
      proposition: '"Ang mamatay nang dahil sayo."',
    },
    {
      img: '../../../assets/images/profile-sample-2.jpg',
      name: 'Trafalgar D. Law',
      position: 'Councilor',
      proposition: `"You can't bring back what you've lost, focus on what you have"`,
    },
    {
      img: '../../../assets/images/profile-sample.jpg',
      name: 'Virgilio L. De Guzman Jr.',
      position: 'Vice Mayor',
      proposition: '"An apple a day, keeps the doctor away"',
    },
    {
      img: '../../../assets/images/profile-sample-2.jpg',
      name: 'Trafalgar D. Law',
      position: 'Councilor',
      proposition: `"You can't bring back what you've lost, focus on what you have"`,
    },
  ];

  windowScrolled: boolean = false;

  _contacts = [
    {
      icon: 'bi bi-droplet-half',
      number: '02-XXX-XXXX',
      place: 'Fire Department',
    },
    {
      icon: 'bi bi-bandaid-fill',
      number: '02-XXX-XXXX',
      place: 'Sample General Hospital',
    },
    {
      icon: 'bi bi-telephone-fill',
      number: '8128-XXXX',
      place: 'Burgos, Ilocos Norte Trunkline',
    },
  ];

  bubblesArr: any = [];
  video = '../../../assets/images/BURGOS-BG-VID.mp4';

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    margin: 15,
    autoplay: true,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  constructor(private announcement: AnnouncementService) {}

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

      case 'pinned':
        this.scrollToLocation(event);
        break;
    }
  }

  scrollToLocation(loc: any) {
    this.element = document.getElementById(loc);
    this.element.scrollIntoView();
  }
}
