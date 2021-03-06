import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ModalsModule } from 'src/app/shared/modals/modals.module';
import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    ModalsModule,
    NgxSkeletonLoaderModule,
  ],
  exports: [NewsComponent],
})
export class NewsModule {}
