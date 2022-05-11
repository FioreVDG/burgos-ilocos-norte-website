import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-vision',
  templateUrl: './mission-vision.component.html',
  styleUrls: ['./mission-vision.component.scss'],
})
export class MissionVisionComponent implements OnInit {
  missions: any = [
    'Industrialization;',
    'Tourism;',
    'Agriculture;',
    'Environmental management and disaster resilience;',
    'People empowerment; and',
    'Institutional development',
  ];
  constructor() {}

  ngOnInit(): void {}
}
