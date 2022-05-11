import { ContentService } from './../../services/content/content.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

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
    return finalLink;
  }

  secure(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
