import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  _infos: Array<any> = [
    {
      label: 'AREA COVERED',
      img: '../../../../assets/images/map.png',
      data: '128.90 KM',
    },
    {
      label: 'POPULATION (2020)',
      img: '../../../../assets/images/population.png',
      data: '10,759',
    },
    {
      label: 'NUMBER OF BRGYS.',
      img: '../../../../assets/images/city-hall.png',
      data: '11',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
