import { Inject, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { HttpService } from '../http/http.service';

@Injectable({
  providedIn: 'root',
})
export class TourismService {
  private tourismData: any;
  private lastIndex: any;
  constructor(@Inject(HttpService) private http: HttpService) {}

  setTourismData(data: any) {
    this.tourismData = data;
  }

  getTourismData() {
    return this.tourismData;
  }

  getRandomTourismData() {
    if (!this.tourismData) {
      console.error('There are no tourism data found');
      return;
    }

    const maxIndex = this.tourismData.length;
    const minIndex = 0;
    const randomizer = () => {
      return Math.floor(Math.random() * (minIndex - maxIndex + 1) + maxIndex);
    };
    let randomizedIndex = randomizer();

    while (this.lastIndex === randomizedIndex) {
      randomizedIndex = randomizer();
    }

    this.lastIndex = randomizedIndex;
    return this.tourismData[randomizedIndex];
  }

  async populateTouristData(willReturnValue: boolean = false) {
    const api = this.getAll({})
      .pipe(map((res: any) => res.env.tourist_spots))
      .toPromise();

    const response = await api;
    this.tourismData = response;
    if (willReturnValue) return response;
  }

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
