import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CitizenCharterService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/citizen-charter', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/citizen-charter', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/citizen-charter/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/citizen-charter/${id}`);
  }
}
