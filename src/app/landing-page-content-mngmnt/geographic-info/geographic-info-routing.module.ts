import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GeographicInfoComponent } from './geographic-info.component';

const routes: Routes = [{ path: '', component: GeographicInfoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeographicInfoRoutingModule {}
