import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [NavigationComponent],
  imports: [CommonModule, NavigationRoutingModule, FontAwesomeModule],
  exports: [NavigationComponent],
})
export class NavigationModule {}
