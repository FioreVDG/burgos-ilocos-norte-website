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

  createMission(body: Object) {
    return this.http.start('post', '/missions', body);
  }

  getAllMission(query: QueryParams) {
    return this.http.start('get', '/missions', {}, query);
  }

  updateMission(body: Object, id: string) {
    return this.http.start('put', `/missions/${id}`, body);
  }

  createHotline(body: Object) {
    return this.http.start('post', '/hotline', body);
  }

  getAllHotline(query: QueryParams) {
    return this.http.start('get', '/hotline', {}, query);
  }

  updateHotline(body: Object, id: string) {
    return this.http.start('put', `/hotline/${id}`, body);
  }

  createGeographic(body: Object) {
    return this.http.start('post', '/geographic', body);
  }

  getAllGeographic(query: QueryParams) {
    return this.http.start('get', '/geographic', {}, query);
  }

  updateGeographic(body: Object, id: string) {
    return this.http.start('put', `/geographic/${id}`, body);
  }

  createContactUs(body: Object) {
    return this.http.start('post', '/contactUs', body);
  }

  getAllContactUs(query: QueryParams) {
    return this.http.start('get', '/contactUs', {}, query);
  }

  createLogoMeaning(body: Object) {
    return this.http.start('post', '/logo-meaning', body);
  }

  getAllLogoMeaning(query: QueryParams) {
    return this.http.start('get', '/logo-meaning', {}, query);
  }

  createHistory(body: Object) {
    return this.http.start('post', '/history', body);
  }

  getAllHistory(query: QueryParams) {
    return this.http.start('get', '/history', {}, query);
  }
  createOfficial(body: Object) {
    return this.http.start('post', '/officials', body);
  }

  getAllOfficials(query: QueryParams) {
    return this.http.start('get', '/officials', {}, query);
  }
  createPubServant(body: Object) {
    return this.http.start('post', '/public-servants', body);
  }
  getAllPubServant(query: QueryParams) {
    return this.http.start('get', '/public-servants', {}, query);
  }
}
