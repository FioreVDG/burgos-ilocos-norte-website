import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/background', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/background', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/background/${id}`, body);
  }
}
