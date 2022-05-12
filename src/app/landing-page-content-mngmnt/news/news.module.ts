import { NoContentModule } from './../../no-content/no-content.module';
import { SpinnerModule } from './../../spinner/spinner.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { AddNewsComponent } from './add-news/add-news.component';
import { NgxFileDropModule } from 'ngx-file-drop';
import { ModalsModule } from 'src/app/shared/modals/modals.module';
import { AngularEditorModule } from '@kolkov/angular-editor';

@NgModule({
  declarations: [NewsComponent, AddNewsComponent],
  imports: [
    CommonModule,
    NewsRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    ModalsModule,
    AngularEditorModule,
    SpinnerModule,
    NoContentModule,
  ],
  exports: [NewsComponent],
})
export class NewsModule {}
