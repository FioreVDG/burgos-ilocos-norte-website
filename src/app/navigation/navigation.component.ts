import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
  }
}
