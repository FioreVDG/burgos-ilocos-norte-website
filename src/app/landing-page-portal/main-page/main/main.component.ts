import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ContentService } from 'src/app/services/content/content.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  loading: boolean = false;
  link: any;
  constructor(
    private content: ContentService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.content.getAll({}).subscribe((res: any) => {
      if (res) {
        this.link =
          res.env.backgrounds[0].link +
          '?autoplay=1&controls=0&showinfo=0&autohide=1';
        this;
        this.loading = false;
        console.log(this.link);
      }
    });
  }
}
