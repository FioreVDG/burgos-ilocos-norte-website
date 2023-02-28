import { servantMobile, servantDesktop } from './public-servants.config';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContentService } from 'src/app/services/content/content.service';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';

@Component({
  selector: 'app-public-servants',
  templateUrl: './public-servants.component.html',
  styleUrls: ['./public-servants.component.scss'],
})
export class PublicServantsComponent implements OnInit {
  isMobile: boolean = false;
  _servantMobile: any = servantMobile;
  _servantDesktop: any = servantDesktop;
  Desktopservant: any = [];
  Mobileservant: any = [];
  constructor(
    public bo: BreakpointObserver,
    private content: ContentService,
    private dropbox: DropboxService
  ) {}

  ngOnInit(): void {
    this.bo
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });

    console.log(this._servantMobile.length);
    console.log(this._servantDesktop);

    this.getOfficials();
  }

  async getTempLink(path: any) {
    const response = await this.dropbox.getTempLink(path).toPromise();
    return response.result.link;
  }

  getOfficials() {
    this.content.getAllPubServant({}).subscribe(async (res: any) => {
      this.Desktopservant = res.env.officials[0].content;
      let i = 0;
      let j = 0;
      console.log(this.Desktopservant);
      for (let row of this.Desktopservant) {
        for (let col of row) {
          let tempImg = await this.getTempLink(col.image.path_display);
          this.Desktopservant[i][j].img = tempImg;
          this.Mobileservant.push(this.Desktopservant[i][j]);
          j = j + 1;
        }
        i = i + 1;
        j = 0;
      }
      console.log(this.Desktopservant);
      console.log(this.Mobileservant);
      // this.loading = false;
    });
  }
}
