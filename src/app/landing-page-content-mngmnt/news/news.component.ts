import { AddNewsComponent } from './add-news/add-news.component';
import { NewsService } from './../../services/news/news.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { QueryParams } from 'src/app/models/queryparams.interface';
import { DropboxService } from 'src/app/services/dropbox/dropbox.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss'],
})
export class NewsComponent implements OnInit {
  newsArr: any = [];
  pagination = {
    pageSize: 10,
    pageNumber: 1,
    totalDocuments: 0,
  };
  loading: boolean = false;
  constructor(
    private news: NewsService,
    private dialog: MatDialog,
    private dbx: DropboxService,
    private sb: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.fetchData();
  }

  fetchData() {
    this.news.getAll({}).subscribe((res: any) => {
      console.log(res);
      this.newsArr = res.env.news;
      this.newsArr.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
      this.loading = false;
      this.pagination.totalDocuments = res.total_docs;
    });
  }

  onPageChange(event: PageEvent) {
    this.pagination.pageSize = event.pageSize;
    this.pagination.pageNumber = event.pageIndex + 1;

    const query: QueryParams = {
      find: [],
      limit: this.pagination.pageSize,
      page: this.pagination.pageNumber,
    };

    this.news.getAll(query).subscribe((res: any) => {
      console.log(res);
      this.newsArr = res.env.news;
      this.pagination.totalDocuments = res.total_docs;
      this.newsArr.forEach(async (el: any) => {
        el.imgUrl = await this.getTempLink(el?.image?.path_display);
        el.layout = await this.stringToHTMLconverter(el.description);
      });
    });
  }

  addNews() {
    this.dialog
      .open(AddNewsComponent, { width: 'auto', height: 'auto' })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  onUpdateNews(news: any) {
    console.log(news);
    this.dialog
      .open(AddNewsComponent, {
        width: '100%',
        height: 'auto',
        disableClose: true,
        data: news,
      })
      .afterClosed()
      .subscribe((res: any) => {
        if (res) this.fetchData();
      });
  }

  deleteNews(id: string) {
    let message = 'Deleting announcement...';

    this._showSnackBar(message);
    this.news.delete(id).subscribe(
      () => {
        message = 'Announcement successfully deleted!';
        this.fetchData();
        this._showSnackBar(message, 'Okay');
      },
      (err) => {
        console.error(err);
        this._showSnackBar(err.error.message);
      }
    );
  }

  markAsFeatured(id: string) {
    this.loading = true;
    this.news.markAsPinned(id).subscribe(
      (res: any) => {
        console.log(res);
        if (res) {
          this.fetchData();
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }

  async getTempLink(data: any) {
    console.log(data);
    const response = await this.dbx.getTempLink(data).toPromise();
    return response.result.link;
  }

  async stringToHTMLconverter(str: any) {
    let dom = document.createElement('p');
    dom.innerHTML = str;
    return dom.textContent || dom.innerText || '';
  }

  private _showSnackBar(message: string, action: string = '') {
    this.sb.open(message, action, {
      duration: 1500,
    });
  }
}
