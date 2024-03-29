import { FileViewerComponent } from './../../shared/modals/file-viewer/file-viewer.component';
import { MatDialog } from '@angular/material/dialog';
import { ServiceService } from './../../services/service/service.service';
import { Component, OnInit } from '@angular/core';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { filter, map, startWith } from 'rxjs/operators';
import { TourismService } from 'src/app/services/tourism/tourism.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  loading: boolean = false;
  services: Array<any> = [];
  myControl = new FormControl('');
  filteredOptions: Observable<any[]>;
  search: string = '';
  searching: boolean = false;
  activeService: any;
  headerBackground: any;
  constructor(
    private service: ServiceService,
    private dbx: DropboxService,
    private dialog: MatDialog,
    private tourist: TourismService
  ) {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  async ngOnInit() {
    this.loading = true;

    if (!this.tourist.getTourismData()) {
      await this.tourist.populateTouristData();
    }
    const randomTouristSpot = this.tourist.getRandomTourismData();
    this.headerBackground = await this.getTempLink(
      randomTouristSpot?.image?.path_display
    );

    this.service.getAll({}).subscribe((res: any) => {
      this.services = res.env.services;
      this.loading = false;
      this.services.forEach(async (el: any) => {
        el.selected = false;
        el.layout = await this.stringToHTMLconverter(el.description);
        el.tempFile = await this.getTempLink(el?.file?.path_display);
      });
      this.activeService = res.env.services[0];
      this.activeService.selected = true;
    });
  }

  onSelect(value: string) {
    for (let i of this.services) {
      i.selected = false;
    }
    let findActive: any = this.services.find((o: any) => o.title === value);
    if (findActive) {
      this.activeService = findActive;
      findActive.selected = true;
    }
  }

  _filter(value: any) {
    const val = value.toLowerCase();
    return this.services.filter((service) =>
      service.title.toLowerCase().includes(val)
    );
  }

  async getTempLink(data: any) {
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.className = '.legislative-content';
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  openFile(url: string, ext: any) {
    this.dialog.open(FileViewerComponent, {
      height: '90%',
      width: '100%',
      data: { url: url, ext: ext },
    });
  }

  onSearch() {
    let query;
    if (this.myControl.value === '') query = { find: [] };
    else
      query = {
        find: [{ field: 'title', operator: '=', value: this.myControl.value }],
      };
    this.searching = true;
    this.service.getAll(query).subscribe((res: any) => {
      this.services = res.env.services;
      this.services.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        el.tempFile = await this.getTempLink(el?.file?.path_display);
      });
      this.searching = false;
    });
  }
}
