import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() changeNavigation: any = new EventEmitter<any>();
  constructor(public router: Router) {}

  ngOnInit(): void {}

  changeRoute(route: any) {
    this.changeNavigation.emit({ loading: true, route: route });
  }
}
