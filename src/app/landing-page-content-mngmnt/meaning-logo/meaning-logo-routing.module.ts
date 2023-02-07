import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeaningLogoComponent } from './meaning-logo.component';

const routes: Routes = [{ path: '', component: MeaningLogoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MeaningLogoRoutingModule {}
