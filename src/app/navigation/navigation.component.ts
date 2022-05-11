import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() changeNavigation: any = new EventEmitter<any>();
  width: any;
  constructor(public router: Router) {}

  ngOnInit(): void {
    console.log(this.router.url);
  }

  changeRoute(route: any) {
    // this.changeNavigation.emit({ loading: true, route: route });
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    const offset =
      document.documentElement.scrollTop || document.body.scrollTop || 0;
    const scrolled = (offset / height) * 100;
    this.width = scrolled;
    // console.log(offset);
    // console.log(height);
    // console.log(this.width);
  }
}
