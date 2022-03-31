import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TransparencyService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/transparencies', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/transparencies', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/transparencies/${id}`, body);
  }

  delete(id: string) {
    return this.http.start('patch', `/transparencies/${id}`);
  }

  getByType() {
    return this.http.start('get', '/transparencies/types');
  }
}
