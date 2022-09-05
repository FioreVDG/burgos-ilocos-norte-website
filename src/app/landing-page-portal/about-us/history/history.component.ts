import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  selectedIndex: number = 0;
  currentMayorUrl: string = '/assets/images/mayor-img.jpg';
  BURGOS_MAYORS: any = [
    {
      name: 'Señor Juan Ignacio',
      date: '(1913)',
    },
    {
      name: 'Felix Garcia',
      date: '(1938-1939)',
    },
    {
      name: 'Marcial Calapini',
      date: '(1939-1943)',
    },
    {
      name: 'Damaso Garcia',
      date: '(1943, Japanese Government)',
    },
    {
      name: 'Bruno Garaza',
      date: '(1944, Japanese Government)',
    },
    {
      name: 'Josefino Macadaeg',
      date: '(Military Government)',
    },
    {
      name: 'Quirino Garalde',
      date: '(Military Government)',
    },
    {
      name: 'Asisclo Pante',
      date: '(Military Government)',
    },
    {
      name: 'Asisclo Pante',
      date: '(1948-1952)',
    },
    {
      name: 'Santos Lagpacan',
      date: '(1952-1955)',
    },
    {
      name: 'Aldrico E. Ignacio, Sr.',
      date: '(1956-1972)',
    },
    {
      name: 'Rodolfo L. Garcia (Acting Mayor)',
      date: '(1978)',
    },
    {
      name: 'Rodolfo L. Garcia',
      date: '(1980-1986)',
    },
    {
      name: 'Benjamin Espejo (OIC Mayor during EDSA)',
      date: '(June 17, 1986 - October 13, 1987)',
    },
    {
      name: 'Rodolfo L. Garcia (OIC Mayor)',
      date: '(October 14 - December 1, 1987)',
    },
    {
      name: 'Ruperto Ignacio, Jr. (OIC Mayor)',
      date: '(January - February, 1988)',
    },
    {
      name: 'Rodolfo L. Garcia',
      date: '(1988-1998)',
    },
    {
      name: 'Benjamin Y. Campañano, Jr.',
      date: '(March 28 - May 5, 1998)',
    },
    {
      name: 'Ofelia Jimenez (OIC Mayor)',
      date: '(May 6 - June 30, 1998)',
    },
    {
      name: 'Benjamin Y. Campañano, Jr.',
      date: '(1998-2004)',
    },
    {
      name: 'Benjamin Y. Campañano, Jr.',
      date: '(2004-2007)',
    },
    {
      name: 'Crescente N. Garcia',
      date: '(2007-2016)',
    },
    {
      name: 'Rodolfo L. Garcia',
      date: '(2016-2019)',
    },
    {
      name: 'Crescente N. Garcia',
      date: '(2019-present)',
    },
  ];

  constructor() {
    // this.BURGOS_MAYORS[0]['active'] = true;
  }

  ngOnInit(): void {
    console.log(this.BURGOS_MAYORS.reverse());
  }

  onIndexChange(method: string) {
    if (method === 'next') {
      if (this.selectedIndex + 1 === this.BURGOS_MAYORS.length) {
        this.selectedIndex = 0;
      } else this.selectedIndex++;
    } else {
      if (this.selectedIndex - 1 < 0) {
        this.selectedIndex = this.BURGOS_MAYORS.length - 1;
      } else this.selectedIndex--;
    }

    this.BURGOS_MAYORS.forEach((mayor: any, index: number) => {
      mayor['active'] = this.selectedIndex === index;
    });
  }
}
