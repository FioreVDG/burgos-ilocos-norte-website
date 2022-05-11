import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/departments', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/departments', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/departments/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/departments/${id}`);
  }
}
