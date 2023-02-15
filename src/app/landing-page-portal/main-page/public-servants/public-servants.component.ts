import { servantMobile, servantDesktop, TRY } from './public-servants.config';
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
  Desktop: any = TRY;
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
    console.log(this.Desktop[2].content.length);

    this.getOfficials();
  }

  async getTempLink(path: any) {
    const response = await this.dropbox.getTempLink(path).toPromise();
    return response.result.link;
  }

  getOfficials() {
    this.content.getAllOfficials({}).subscribe(async (res: any) => {
      console.log(res);
      let pubSer: any = [];
      let size = 4;
      let j = 0;
      if (res.env.officials[0]) {
        let result = res.env.officials[0];

        for (let m of res.env.officials[0].mayor) {
          console.log(m.image.path_display);
          let tempImg = await this.getTempLink(m.image.path_display);
          m.image = tempImg;
          this.Desktopservant.push({ content: [m] });
          this.Mobileservant.push({ content: [m] });
        }

        for (let m of res.env.officials[0].viceMayor) {
          let tempImg = await this.getTempLink(m.image.path_display);

          m.image = tempImg;
          this.Desktopservant.push({ content: [m] });
          this.Mobileservant.push({ content: [m] });
        }

        while (j != res.env.officials[0].members.length) {
          for (let k = 0; k < size; k++) {
            let tempImg = await this.getTempLink(
              res.env.officials[0].members[j].image.path_display
            );
            res.env.officials[0].members[j].image = tempImg;
            pubSer.push(res.env.officials[0].members[j]);
            this.Mobileservant.push({
              content: [res.env.officials[0].members[j]],
            });
            j++;
          }
          this.Desktopservant.push({ content: pubSer });
          size = 3;
          pubSer = [];
        }
        console.log('final', this.Desktopservant);
        console.log('orig', this._servantDesktop);
        let positions = ['mayor', 'viceMayor', 'members'];
      }
    });
  }

  // getOfficialss() {
  //   this.content.getAllOfficials({}).subscribe((res: any) => {
  //     console.log(res.env.officials[0]);
  //     let pubSer: any = [];
  //     let size = 4;
  //     let j = 0;

  //     this.servant.push({ content: res.env.officials[0].mayor });
  //     this.servant.push({ content: res.env.officials[0].viceMayor });

  //     while (j != res.env.officials[0].members.length) {
  //       for (let k = 0; k < size; k++) {
  //         pubSer.push(this.Desktop[2].content[j]);
  //         j++;
  //       }
  //       this.servant.push({ content: pubSer });
  //       size = 3;
  //       pubSer = [];
  //     }
  //     console.log(this.servant);
  //   });
  // }
}
