import { LegislativeService } from './../../services/legislative/legislative.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-legislative',
  templateUrl: './legislative.component.html',
  styleUrls: ['./legislative.component.scss'],
})
export class LegislativeComponent implements OnInit {
  legislatives: any = [];
  loading: boolean = false;
  constructor(private legislative: LegislativeService) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchLegislatives();
  }

  fetchLegislatives() {
    this.legislative.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.loading = false;
      this.legislatives = res.env.legislatives;
      this.legislatives.forEach(async (el: any) => {
        el.layout = await this.stringToHTMLconverter(el.description);
        // let e: HTMLDivElement = el.layout;
        // console.log(document.getElementById('temp'));
        // document.getElementById('temp')?.appendChild(el.layout);
      });
    });
    console.log(this.legislatives);
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('div');
    dom.className = '.legislative-content';
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }
}
