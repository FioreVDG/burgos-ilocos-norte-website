import { ContentService } from 'src/app/services/content/content.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mission-vision',
  templateUrl: './mission-vision.component.html',
  styleUrls: ['./mission-vision.component.scss'],
})
export class MissionVisionComponent implements OnInit {
  hasExistingMisVis: boolean = false;
  about: any;
  loading: boolean = false;
  missions: any = [
    'Industrialization;',
    'Tourism;',
    'Agriculture;',
    'Environmental management and disaster resilience;',
    'People empowerment; and',
    'Institutional development',
  ];
  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
    this.content.getAllMission({}).subscribe(
      (res: any) => {
        console.log(res);
        this.loading = false;
        if (res.env.mission_visions.length) {
          this.hasExistingMisVis = true;
          this.about = res.env.mission_visions[0];
          this.about.missionLayout = this.stringToHTMLconverter(
            this.about.mission
          );
          this.about.visionLayout = this.stringToHTMLconverter(
            this.about.vision
          );
          console.log(this.about);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }
}
