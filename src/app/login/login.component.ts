import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  loginForm: FormGroup = this.fb.group({
    username: new FormControl('mevistacorps1', [Validators.required]),
    password: new FormControl('Password123!', [Validators.required]),
  });

  ngOnInit(): void {}

  onLoginClick() {
    const { username, password } = this.loginForm.getRawValue();

    this.auth.login(username, password).subscribe((res: any) => {
      console.log(res);
      if (res) {
        localStorage.setItem('SESSION_CSURF_TOKEN', res.session_token);
        localStorage.setItem('SESSION_AUTH', res.token);
        this.router.navigate(['/content-management/add-announcement']);
      }
    });
  }
}
