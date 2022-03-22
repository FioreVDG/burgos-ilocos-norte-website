import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CitizenCharterComponent } from './citizen-charter.component';

const routes: Routes = [
  {
    path: '',
    component: CitizenCharterComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CitizenCharterRoutingModule {}
