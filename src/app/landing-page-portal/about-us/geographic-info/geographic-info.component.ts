import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-geographic-info',
  templateUrl: './geographic-info.component.html',
  styleUrls: ['./geographic-info.component.scss'],
})
export class GeographicInfoComponent implements OnInit {
  image1: string = '/assets/images/to-be-used/kapurpurawan-2.jpg';
  image2: string = '/assets/images/to-be-used/pagali-natural-pool-2.jpeg';
  constructor() {}

  ngOnInit(): void {}
}
