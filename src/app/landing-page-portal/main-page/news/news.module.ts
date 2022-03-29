import { MaterialModule } from './../../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';

@NgModule({
  declarations: [NewsComponent],
  imports: [CommonModule, MaterialModule],
  exports: [NewsComponent],
})
export class NewsModule {}
