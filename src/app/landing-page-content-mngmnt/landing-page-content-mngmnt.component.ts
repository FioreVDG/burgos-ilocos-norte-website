import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page-content-mngmnt',
  templateUrl: './landing-page-content-mngmnt.component.html',
  styleUrls: ['./landing-page-content-mngmnt.component.scss'],
})
export class LandingPageContentMngmntComponent implements OnInit {
  constructor(private router: Router, private auth: AuthService) {}
  ///
  ngOnInit(): void {}

  logout() {
    localStorage.removeItem('SESSION_CSURF_TOKEN');
    localStorage.removeItem('SESSION_AUTH');
    setTimeout(() => {
      this.router.navigate(['/admin-login']);
    }, 1000);
  }
}
