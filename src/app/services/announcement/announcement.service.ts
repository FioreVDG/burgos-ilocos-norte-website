import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/annoucements', body);
  }

  getAll(query: any) {
    return this.http.start('get', '/annoucements', {}, query);
  }

  update(body: Object, id: String) {
    return this.http.start('put', `/annoucements/${id}`, body);
  }
}
