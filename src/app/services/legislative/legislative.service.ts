import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class LegislativeService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/legislatives', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/legislatives', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/legislatives/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/legislatives/${id}`);
  }
}
