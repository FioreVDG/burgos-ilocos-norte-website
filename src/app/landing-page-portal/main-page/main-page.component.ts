import { Component, OnInit } from '@angular/core';
declare let google: any;
@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
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

  constructor() {}

  ngOnInit(): void {
    this.initMap();
  }

  initMap(): void {
    // The location of sanNicolas
    const sanNicolas = { lat: 18.1471, lng: 120.5855 };
    // The map, centered at sanNicolas
    const map = new google.maps.Map(
      document.getElementById('map') as HTMLElement,
      {
        zoom: 12,
        center: sanNicolas,
      }
    );

    // The marker, positioned at sanNicolas
    const marker = new google.maps.Marker({
      position: sanNicolas,
      map: map,
    });
  }
}
