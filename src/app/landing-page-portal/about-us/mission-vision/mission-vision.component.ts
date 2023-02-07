import { ContentService } from 'src/app/services/content/content.service';
import { Component, OnInit, Pipe } from '@angular/core';
import {
  animate,
  group,
  keyframes,
  query,
  sequence,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { DomSanitizer } from '@angular/platform-browser';

const animation = trigger('animation', [
  transition('void => vision', [
    style({ opacity: 0, height: 0, transform: 'translateY(-144px)' }),
    animate('500ms cubic-bezier(.25,.46,.45,.94)'),
  ]),
  transition('vision => mission', [
    group([
      query(
        '.vision:leave',
        animate(
          '80ms cubic-bezier(.25,.46,.45,.94)',
          style({ opacity: 0, height: 0, transform: 'translateY(144px)' })
        ),
        { optional: true }
      ),
      query(
        '.mission:enter',
        [
          style({ opacity: 0, height: 0, transform: 'translateY(144px)' }),
          animate(
            '500ms cubic-bezier(.25,.46,.45,.94)',
            style({ opacity: 1, height: '*', transform: 'translateY(0)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
  transition('mission => vision', [
    group([
      query(
        '.mission:leave',
        animate(
          '80ms cubic-bezier(.25,.46,.45,.94)',
          style({ opacity: 0, height: 0, transform: 'translateY(-144px)' })
        ),
        { optional: true }
      ),
      query(
        '.vision:enter',
        [
          style({ opacity: 0, height: 0, transform: 'translateY(-144px)' }),
          animate(
            '500ms cubic-bezier(.25,.46,.45,.94)',
            style({ opacity: 1, height: '*', transform: 'translateY(0)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

@Component({
  selector: 'app-mission-vision',
  templateUrl: './mission-vision.component.html',
  styleUrls: ['./mission-vision.component.scss'],
  animations: [animation],
})
export class MissionVisionComponent implements OnInit {
  hasExistingMisVis: boolean = false;
  about: any;
  loading: boolean = true;
  missions: any = [
    'Industrialization;',
    'Tourism;',
    'Agriculture;',
    'Environmental management and disaster resilience;',
    'People empowerment; and',
    'Institutional development',
  ];

  screens = [
    {
      header: 'OUR VISION',
      body: `The renewable energy and tourism capital of the North with balanced and climate-resilient community under the stewardship of firm and committed leaders inhabited by empowered and God-fearing citizenry.`,
    },
    {
      header: 'OUR MISSION',
      body: `Burgos shall improve the quality of life of every Burgoseño through:`,
      items: [],
    },
  ];

  screenIndex = 0;
  test: any;
  constructor(
    private content: ContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
    const toHtml = (string: string) => {
      return this.stringToHTMLconverter(string);
    };

    this.content.getAllMission({}).subscribe(
      (res: any) => {
        console.log('mission/vis', res);
        this.loading = false;
        if (res.env.mission_visions.length) {
          // this.hasExistingMisVis = true;
          this.about = res.env.mission_visions[0];
          console.log(this.about);
          this.test = this.sanitizer.bypassSecurityTrustHtml(
            toHtml(this.about.mission)
          );
          console.log(this.test);

          this.screens[1].body = toHtml(this.about.mission);
          this.screens[0].body = toHtml(this.about.vision);
          console.log(this.screens);
        } else this.screens[1].items = this.missions;
      },
      (err) => {
        console.error(err);
      }
    );
  }

  changeScreen() {
    if (this.screenIndex === 1) this.screenIndex -= 1;
    else this.screenIndex += 1;
  }

  stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }
}
