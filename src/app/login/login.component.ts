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
  constructor(private auth: AuthService, private fb: FormBuilder) {}

  loginForm: FormGroup = this.fb.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.auth.login('mevistacorps1', 'Password123!').subscribe((res) => {
      console.log(res);
    });
  }

  onLoginClick() {
    const { username, password } = this.loginForm.getRawValue();

    this.auth.login(username, password).subscribe((res) => {
      console.log(res);
    });
  }
}
