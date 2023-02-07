import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicServantsComponent } from './public-servants.component';

const routes: Routes = [{ path: '', component: PublicServantsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicServantsRoutingModule {}
