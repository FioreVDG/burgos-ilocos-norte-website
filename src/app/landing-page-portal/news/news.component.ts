import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { NewsService } from 'src/app/services/news/news.service';
import { ViewerComponent } from 'src/app/shared/modals/viewer/viewer.component';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsArr: any = [];
  featuredNews: any;
  featuredImage: any;
  featuredDesc: any;
  loading: boolean = false;
  constructor(
    private dbx: DropboxService,
    private news: NewsService,
    public router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }
  fetchData() {
    this.news.getAll({}).subscribe(async (res: any) => {
      this.newsArr = res.env.news;
      this.newsArr.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.featuredNews = this.newsArr.find((o: any) => o.isPinned === true);
      this.featuredImage = await this.getTempLink(
        this.featuredNews?.image?.path_display
      );
      this.featuredDesc = await this.stringToHTMLconverter(
        this.featuredNews?.description
      );
      this.newsArr = this.newsArr.filter((o: any) => o.isPinned === false);

      this.loading = false;
      // console.log(this.featuredNews);
      // console.log(this.featuredImage);
      // console.log(this.newsArr);
    });
  }

  async getTempLink(data: any) {
    const respone = await this.dbx.getTempLink(data).toPromise();
    return respone.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('p');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  showMore(data: any) {
    // console.log(data);
    this.dialog.open(ViewerComponent, {
      minWidth: '100vw',
      height: '100%',
      data: data,
      panelClass: 'dialog-no-padding',
    });
  }
}
