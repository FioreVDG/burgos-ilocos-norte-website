import { servantMobile, servantDesktop } from './public-servants.config';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-public-servants',
  templateUrl: './public-servants.component.html',
  styleUrls: ['./public-servants.component.scss'],
})
export class PublicServantsComponent implements OnInit {
  isMobile: boolean = false;
  _servantMobile: any = servantMobile;
  _servantDesktop: any = servantDesktop;

  constructor(public bo: BreakpointObserver) {}

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
  }
}
