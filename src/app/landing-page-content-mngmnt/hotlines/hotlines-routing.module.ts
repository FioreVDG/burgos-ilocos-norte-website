import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotlinesComponent } from './hotlines.component';

const routes: Routes = [{ path: '', component: HotlinesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotlinesRoutingModule {}
