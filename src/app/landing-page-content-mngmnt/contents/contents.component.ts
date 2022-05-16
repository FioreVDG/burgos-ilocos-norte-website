import { ContentService } from './../../services/content/content.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-contents',
  templateUrl: './contents.component.html',
  styleUrls: ['./contents.component.scss'],
})
export class ContentsComponent implements OnInit {
  link: string = '';
  fLink: string;
  hasLink: boolean = false;
  loading: boolean = false;
  id: string = '';
  resHolder: Array<any> = [];
  mission: string = '';
  vision: string = '';
  abouts: Array<any> = [];

  configMission: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['backgroundColor', 'htmlCode', 'insertImage', 'insertVideo', 'htmlCode'],
    ],
    customClasses: [
      {
        name: 'For Heading 1',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'For Heading 2',
        class: 'titleText',
        tag: 'h2',
      },
      {
        name: 'For Heading 3',
        class: 'titleText',
        tag: 'h3',
      },
    ],
  };

  configVision: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '25rem',
    placeholder: 'Enter description here...',
    translate: 'no',
    defaultParagraphSeparator: '',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['backgroundColor', 'htmlCode', 'insertImage', 'insertVideo', 'htmlCode'],
    ],
    customClasses: [
      {
        name: 'For Heading 1',
        class: 'titleText',
        tag: 'h1',
      },
      {
        name: 'For Heading 2',
        class: 'titleText',
        tag: 'h2',
      },
      {
        name: 'For Heading 3',
        class: 'titleText',
        tag: 'h3',
      },
    ],
  };

  constructor(
    private sanitizer: DomSanitizer,
    private content: ContentService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.content.getAll({}).subscribe((res: any) => {
      if (res) {
        this.hasLink = true;
        this.loading = false;
        console.log(res);
        this.resHolder = res.env.backgrounds;
        console.log(this.resHolder);
        if (res.env.backgrounds.length) {
          this.fLink = res.env.backgrounds[0].link;
          this.link = this.fLink;
          this.id = res.env.backgrounds[0]._id;
        }
      }
    });
  }

  getAbouts() {
    this.content.getAllMission({}).subscribe(
      (res: any) => {
        if (res.env.mission_vision.length) {
          this.abouts = res.env.mission_vision;
          this.mission = res.env.mission_vision[0].mission;
          this.vision = res.env.mission_vision[0].vision;
        }
      },
      (err) => console.log(err)
    );
  }

  set() {
    this.hasLink = true;
    this.fLink = this.transformLink(this.link);
    console.log(this.fLink);

    const dataToAdd = {
      link: this.fLink,
    };
    this.content.create(dataToAdd).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update() {
    console.log('UPDATE');
    this.fLink = this.transformLink(this.link);
    console.log(this.fLink);
    const dataToUpdate = {
      link: this.fLink,
    };
    this.content.update(dataToUpdate, this.id).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  transformLink(link: string) {
    console.log(link);
    let split = link.split('?v=');
    let newLink = split[0] + `/embed/` + split[1];
    let split2 = newLink.split('/watch');
    let finalLink = split2[0] + split2[1];
    return finalLink + '?autoplay=1&controls=0&showinfo=0&muted=1';
  }

  secure(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  missionVision() {
    const toAddData = { mission: this.mission, vision: this.vision };
    this.content.createMission(toAddData).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }
}
