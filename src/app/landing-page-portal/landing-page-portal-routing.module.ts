import { LandingPagePortalComponent } from './landing-page-portal.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingPagePortalComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'landing-page-main',
      },
      {
        path: 'landing-page-main',
        loadChildren: () =>
          import('./main-page/main-page.module').then((m) => m.MainPageModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPagePortalRoutingModule {}
