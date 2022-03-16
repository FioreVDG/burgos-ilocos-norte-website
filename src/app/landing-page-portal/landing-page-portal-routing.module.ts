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
      {
        path: 'legislative',
        loadChildren: () =>
          import('./legislative/legislative.module').then(
            (m) => m.LegislativeModule
          ),
      },
      {
        path: 'transparency',
        loadChildren: () =>
          import('./transparency/transparency.module').then(
            (m) => m.TransparencyModule
          ),
      },
      {
        path: 'tourism',
        loadChildren: () =>
          import('./tourism/tourism.module').then((m) => m.TourismModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPagePortalRoutingModule {}
