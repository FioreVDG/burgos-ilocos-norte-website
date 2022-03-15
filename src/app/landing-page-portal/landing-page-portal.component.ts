import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page-portal',
  templateUrl: './landing-page-portal.component.html',
  styleUrls: ['./landing-page-portal.component.scss'],
})
export class LandingPagePortalComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
    if (this.router.url === '/')
      this.router.navigate(['landing-page/landing-page-main']);
  }
}
