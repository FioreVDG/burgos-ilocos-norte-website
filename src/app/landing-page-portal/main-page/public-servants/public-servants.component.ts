import { servantMobile, servantDesktop, TRY } from './public-servants.config';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { ContentService } from 'src/app/services/content/content.service';

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
  servant: any = [];
  constructor(public bo: BreakpointObserver, private content: ContentService) {}

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

  getOfficials() {
    this.content.getAllOfficials({}).subscribe((res: any) => {
      console.log(res.env.officials[0]);
      let pubSer: any = [];
      let size = 4;
      let j = 0;

      this.servant.push({ content: res.env.officials[0].mayor });
      this.servant.push({ content: res.env.officials[0].viceMayor });

      while (j != res.env.officials[0].members.length) {
        for (let k = 0; k < size; k++) {
          pubSer.push(this.Desktop[2].content[j]);
          j++;
        }
        this.servant.push({ content: pubSer });
        size = 3;
        pubSer = [];
      }
      console.log(this.servant);
    });
  }
}
