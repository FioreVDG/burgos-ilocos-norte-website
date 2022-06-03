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
  showHeader: boolean = false;
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
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0)
      this.showHeader = true;
    else this.showHeader = false;

    // console.log(offset);
    // console.log(height);
    // console.log(this.width);
  }
}
