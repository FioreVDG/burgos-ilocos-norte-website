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
  loading: boolean = false;
  constructor(public router: Router) {}

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1500);
    console.log(this.router.url);
    if (this.router.url === '/')
      this.router.navigate(['landing-page/landing-page-main']);
  }

  changeRoute() {
    const routeEvent = this.router.events.subscribe(
      (event: NavigationEvent) => {
        if (event instanceof NavigationStart) {
          this.loading = true;
        } else if (event instanceof NavigationEnd) {
          routeEvent.unsubscribe();
          setTimeout(() => {
            this.loading = false;
          }, 1000);
        }
      }
    );
  }
}
