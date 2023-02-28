import { AuthService } from './../services/auth/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AlertAreYouSureComponent } from '../shared/modals/alert-are-you-sure/alert-are-you-sure.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-landing-page-content-mngmnt',
  templateUrl: './landing-page-content-mngmnt.component.html',
  styleUrls: ['./landing-page-content-mngmnt.component.scss'],
})
export class LandingPageContentMngmntComponent implements OnInit {
  constructor(
    private router: Router,
    private auth: AuthService,
    private dialog: MatDialog,
    private sb: MatSnackBar
  ) {}
  ///
  ngOnInit(): void {
    this.hasSessionAuth();
  }

  hasSessionAuth() {
    let session_csurf_auth = localStorage.getItem('SESSION_CSURF_TOKEN');
    let session_auth = localStorage.getItem('SESSION_AUTH');

    if (session_auth == null || session_csurf_auth == null) {
      this.sb.open('You need to login to continue', 'okay', {
        duration: 9000,
        panelClass: ['snackbar'],
      });
      this.router.navigate(['/admin-login']);
    }
  }

  logout() {
    this.dialog
      .open(AlertAreYouSureComponent, {
        disableClose: true,
        data: {
          title: 'Logout',
          message: 'Are you sure you want to logout?',
        },
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) {
          localStorage.removeItem('SESSION_CSURF_TOKEN');
          localStorage.removeItem('SESSION_AUTH');
          setTimeout(() => {
            this.router.navigate(['/admin-login']);
          }, 1000);
        }
      });
  }
}
