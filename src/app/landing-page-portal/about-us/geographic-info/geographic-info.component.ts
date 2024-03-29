import {
  animate,
  animateChild,
  group,
  query,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';

import * as L from 'leaflet';
import { BURGOS_GEOJSON } from 'src/app/data/burgos.geojson';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-geographic-info',
  templateUrl: './geographic-info.component.html',
  styleUrls: ['./geographic-info.component.scss'],
  animations: [
    trigger('slideAnim', [
      transition('* => next', [
        group([
          query(
            '.geo-content:leave',
            [
              style({ opacity: 1, transform: 'translateX(0)' }),
              animate(
                '350ms ease',
                style({ opacity: 1, transform: 'translateX(-100%)' })
              ),
            ],
            { optional: true }
          ),
          query(
            '.geo-content:enter',
            [
              style({ opacity: 0, transform: 'translateX(100%)' }),
              animate(
                '350ms ease',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
      transition('* => prev', [
        group([
          query(
            '.geo-content:leave',
            [
              style({ opacity: 1, transform: 'translateX(0)' }),
              animate(
                '350ms ease',
                style({ opacity: 1, transform: 'translateX(100%)' })
              ),
            ],
            { optional: true }
          ),
          query(
            '.geo-content:enter',
            [
              style({ opacity: 0, transform: 'translateX(-100%)' }),
              animate(
                '350ms ease',
                style({ opacity: 1, transform: 'translateX(0)' })
              ),
            ],
            { optional: true }
          ),
        ]),
      ]),
    ]),
  ],
})
export class GeographicInfoComponent implements OnInit, AfterViewInit {
  image1: string = '/assets/images/to-be-used/kapurpurawan-2.jpg';
  image2: string = '/assets/images/to-be-used/pagali-natural-pool-2.jpeg';
  lastAction: string;
  debounceClick: boolean = false;
  geographicalInfo: any;

  // geographicalInfo: any = [
  //   {
  //     title: 'Geographic Location',
  //     body: `Located in between two growth centers, Laoag City and Bangui, lies the
  //     town of Burgos. It is 48 kilometers and 16 kilometers away from Laoag City
  //     and Bangui, respectively. It is approximately 540 kilometers north of
  //     Manila. It lies 18 degrees, 30 minutes latitude and 120 degrees, 38
  //     minutes longtitude. Bounded on the north and west by the West Philippine
  //     Sea, on the east by the municipalities of Bangui and Vintar, and on the
  //     south by the Municipality of Pasuquin. It is a coastal municipality with a
  //     15-kilometer coastline.`,
  //   },
  //   {
  //     title: 'Topography / Slope',
  // body: `Burgos has rugged terrain. Narrow to broad valley of rolling plains are
  // found at 50 to 180 meters above sea level. These areas are bisected with
  // creeks and gently sloping shallow depression originating from the hill
  // ranges and draining into Baruyen River, the main tributary cutting thru
  // the municipality. Slope ranges from 1% to 60%.`,
  //   },
  //   {
  //     title: 'Land Resources',
  // body: `Land Area. The municipality has a total land area of 12,928 hectares more
  // or less based/as provided by the Department of Environment and Natural
  // Resources Community Environment and Natural Resources Office (DENR-CENRO)
  // Bangui, Ilocos Norte.`,
  //   },
  //   {
  //     title: 'Land Classification',
  // body: `Out of the total land area of the Municipality, about 7,345 hectares or
  // 56.81% of the total municipal land are classified as forestlands. The
  // remaining 5,583 hectares or 43.19% are classified as Alienable and
  // Disposable lands (A & D). All barangays, except Brgys. Saoit and Pagali,
  // have forestlands.`,
  //   },
  //   {
  //     title: 'Barangays',
  // body: `The Municipality of Burgos is a 5th class municipality with eleven (11)
  // barangays namely: Poblacion, Ablan, Agaga, Bayog, Bobon, Buduan, Nagsurot,
  // Paayas, Pagali, Saoit and Tanap. Seven (7) are coastal barangays: Brgys.
  // Paayas, Bobon, Bayog, Ablan, Pagali, Saoit and Poblacion. The remaining
  // are landlocked barangays.`,
  //   },
  // ];

  // statisticalInformation: any = [
  //   {
  //     title: 'Population (2020)',
  //     body: '10,759',
  //     icon: 'bi bi-house-door-fill',
  //   },
  //   {
  //     title: 'Barangays',
  //     body: '11',
  //     icon: 'bi bi-bank2',
  //   },
  //   {
  //     title: 'Total Land Area',
  //     body: '12,928',
  //     icon: 'bi bi-map-fill',
  //   },
  // ];

  statistic = ['bi bi-house-door-fill', 'bi bi-bank2', 'bi bi-map-fill'];

  selectedGeoIndex: number = 0;

  // MAP
  map: L.Map;
  burgosGeojson: any;
  baseControls: L.Control.Layers;

  constructor(
    private cdr: ChangeDetectorRef,
    private content: ContentService
  ) {}

  ngOnInit() {
    this.getGeoInfo();
  }

  getGeoInfo() {
    this.content.getAllGeographic({}).subscribe((res: any) => {
      console.log(res);
      console.log(res.env.geographics[0]);
      this.geographicalInfo = res.env.geographics[0];
    });
  }

  lastActionReset() {
    this.lastAction = 'default';
    this.cdr.detectChanges();
  }

  ngAfterViewInit() {
    this._initMap();
  }

  onGeoInfoChange(action: string) {
    if (this.debounceClick) return;
    this.debounceClick = true;

    const maxLength = this.geographicalInfo.geographical_info.length;
    switch (action) {
      case 'prev':
        if (this.selectedGeoIndex - 1 < 0) {
          this.selectedGeoIndex = maxLength - 1;
        } else this.selectedGeoIndex -= 1;

        break;
      case 'next':
        if (this.selectedGeoIndex + 1 === maxLength) {
          this.selectedGeoIndex = 0;
        } else this.selectedGeoIndex += 1;

        break;
    }
    this.lastAction = action;
    // console.log(this.selectedGeoIndex);
    this.cdr.detectChanges();
  }

  private _initMap() {
    this.map = L.map('map', {
      attributionControl: false,
      center: [12.8797, 121.774],
      zoomControl: false,
      zoom: 8,
      minZoom: 8,
      maxZoom: 17,
      doubleClickZoom: false,
      // scrollWheelZoom: false,
      // dragging: false,
    });

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //   attribution:
    //     '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    // }).addTo(this.map);

    this.baseControls = L.control
      .layers({}, {}, { collapsed: false })
      .addTo(this.map);

    this.baseControls.getContainer()?.setAttribute('style', 'display:none');

    this.burgosGeojson = L.geoJSON(BURGOS_GEOJSON, {
      style: (feature: any) => {
        let fillColor: string = 'var(--primary)';
        let fillOpacity = 1;
        let dashArray = '4';
        let weight = 2;

        return {
          fillColor,
          fillOpacity,
          weight,
          opacity: 1,
          color: 'var(--white)',
          dashArray,
        };
      },

      onEachFeature: (feature: any, layer: any) => {
        const name = feature.properties.ADM4_EN;
        const tooltipStyle = {
          permanent: true,
          direction: 'center',
          interactive: false,
          className: 'leaflet-custom-tooltip',
        };

        const center = layer.getBounds().getCenter();

        layer.bindTooltip(name, tooltipStyle);
        layer.openTooltip(center);
      },
    });
    this.baseControls.addBaseLayer(this.burgosGeojson, 'BURGOS');
    this.burgosGeojson.addTo(this.map);

    this.map.setMaxBounds(this.burgosGeojson.getBounds());
    this.map.fitBounds(this.burgosGeojson.getBounds());
  }
}
