import {
  GetAnnouncementsResponse,
  UpsertAnnouncementResponse,
  AnnouncementBody,
} from './../../models/api/announcement-service.interface';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../http/http.service';
import { QueryParams } from 'src/app/models/queryparams.interface';

@Injectable({
  providedIn: 'root',
})
export class AnnouncementService {
  constructor(@Inject(HttpService) private http: HttpService) {}

  create(body: AnnouncementBody) {
    return this.http.start<UpsertAnnouncementResponse>(
      'post',
      '/annoucements',
      body
    );
  }

  getAll(query: QueryParams) {
    return this.http.start<GetAnnouncementsResponse>(
      'get',
      '/annoucements',
      {},
      query
    );
  }

  update(body: AnnouncementBody, id: string) {
    return this.http.start<UpsertAnnouncementResponse>(
      'put',
      `/annoucements/${id}`,
      body
    );
  }

  delete(id: string) {
    return this.http.start<null>('patch', `/annoucements/${id}`);
  }

  markAsPinned(id: string) {
    return this.http.start('patch', `/annoucements/${id}/pin`);
  }
}
