import { NoContentModule } from './../../no-content/no-content.module';
import { SpinnerModule } from './../../spinner/spinner.module';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule,
    SpinnerModule,
    NoContentModule,
  ],
  exports: [NewsComponent],
})
export class NewsModule {}
