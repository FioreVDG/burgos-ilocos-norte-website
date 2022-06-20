import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  HostListener,
} from '@angular/core';
import {} from '@fortawesome/free-solid-svg-icons';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  @Output() changeNavigation: any = new EventEmitter<any>();
  isMobile: boolean = false;
  width: any;
  showHeader: boolean = false;
  constructor(public router: Router, public bo: BreakpointObserver) {}

  ngOnInit(): void {
    this.bo
      .observe(['(min-width: 600px)'])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMobile = false;
        } else {
          this.isMobile = true;
        }
      });
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
