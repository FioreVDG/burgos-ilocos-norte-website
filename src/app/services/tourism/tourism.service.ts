import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TourismService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/tourist-spots', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/tourist-spots', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/tourist-spots/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/tourist-spots/${id}`);
  }
}
