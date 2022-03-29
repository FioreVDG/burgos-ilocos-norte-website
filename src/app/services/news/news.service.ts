import { Inject, Injectable } from '@angular/core';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: Object) {
    return this.http.start('post', '/news', body);
  }

  getAll(query: QueryParams) {
    return this.http.start('get', '/news', {}, query);
  }

  update(body: Object, id: string) {
    return this.http.start('put', `/news/${id}`, body);
  }

  delete(id: string) {
    return this.http.start<null>('patch', `/news/${id}`);
  }

  markAsPinned(id: string) {
    return this.http.start('patch', `/news/${id}/pin`);
  }
}
