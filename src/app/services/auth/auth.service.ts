import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL } from 'src/app/config/url';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = URL;

  constructor(private http: HttpClient) {}

  setHeaders() {
    let session_token = localStorage.getItem('SESSION_TOKEN')!;
    let bearer_token = localStorage.getItem('SESSION_AUTH');

    let headers = new HttpHeaders({
      s_auth: session_token || '',
      authorization: `Bearer ${bearer_token}` || '',
    });
    return { headers };
  }

  getHeaders() {
    return {
      ...this.setHeaders(),
    };
  }

  login(username: string, password: string) {
    return this.http.post(this.url + `/auth/login`, { username, password });
  }

  logout() {
    return this.http.get(this.url + '/auth/logout', this.getHeaders());
  }

  me() {
    return this.http.get(this.url + '/auth/me', this.getHeaders());
  }

  verifyResetPassToken(token: string) {
    return this.http.get(
      this.url + `/auth/reset-password/${token}`,
      this.getHeaders()
    );
  }

  resetPassword(token: string, body: object) {
    return this.http.put(
      this.url + `/auth/reset-password/${token}`,
      body,
      this.getHeaders()
    );
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + `/auth/forgot-password`, { email });
  }

  checkPassword(password: string) {
    return this.http.post(
      this.url + `/auth/check-password`,
      { password },
      this.getHeaders()
    );
  }

  updatePassword(body: object) {
    return this.http.put(
      this.url + '/auth/update-password',
      body,
      this.getHeaders()
    );
  }
}
