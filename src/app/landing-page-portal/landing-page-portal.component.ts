import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationStart,
  Router,
  Event as NavigationEvent,
} from '@angular/router';
@Component({
  selector: 'app-landing-page-portal',
  templateUrl: './landing-page-portal.component.html',
  styleUrls: ['./landing-page-portal.component.scss'],
})
export class LandingPagePortalComponent implements OnInit {
  loading: any = false;
  currentURL: any;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.currentURL = this.router.url;
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
    if (this.router.url === '/') this.router.navigate(['landing-page/welcome']);
  }

  changeRoute(ev: any) {
    if (this.router.url !== ev.route) {
      this.loading = ev.loading;
      this.currentURL = this.router.url;
      const routeEvent = this.router.events.subscribe(
        (event: NavigationEvent) => {
          if (event instanceof NavigationStart) {
          } else if (event instanceof NavigationEnd) {
            routeEvent.unsubscribe();
            setTimeout(() => {
              ev.loading = false;
              this.loading = ev.loading;
            }, 1000);
          }
        }
      );
    }
  }
}
