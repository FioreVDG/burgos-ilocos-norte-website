import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  burgosFbLink = 'https://www.facebook.com/profile.php?id=100086568086256';

  constructor() {}

  ngOnInit(): void {}
}
