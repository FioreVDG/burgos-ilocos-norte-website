import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class CareerService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/careers', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/careers', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/careers/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/careers/${id}`);
  }
}
