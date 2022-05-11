import { Router } from '@angular/router';
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
  play: boolean = false;
  hasLink: boolean = false;
  constructor(
    private content: ContentService,
    private sanitizer: DomSanitizer,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.content.getAll({}).subscribe((res: any) => {
      if (res) {
        this.link = res.env.backgrounds[0].link;
        this.loading = false;
        if (this.link !== '') {
          this.hasLink = true;
        }
        console.log(this.link);
      }
    });
  }

  delay() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  secure(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
