import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services/content/content.service';
import { FOOTER } from './footer.config';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  burgosFbLink = 'https://www.facebook.com/profile.php?id=100086568086256';
  about = FOOTER;
  contacts: any;
  loading: boolean = true;

  constructor(private content: ContentService) {}

  ngOnInit(): void {
    this.content.getAllContactUs({}).subscribe((res: any) => {
      this.contacts = res.env.contacts[0];
      console.log(this.contacts);

      this.loading = false;
    });
  }
}
