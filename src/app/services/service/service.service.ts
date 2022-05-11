import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/services', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/services', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/services/${id}`, body);
  }

  delete(id: string) {
    return this.http.start<null>('patch', `/services/${id}`);
  }
}
