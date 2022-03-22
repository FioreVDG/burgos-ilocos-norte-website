import { LandingPageContentMngmntComponent } from './landing-page-content-mngmnt.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: LandingPageContentMngmntComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'announcement',
      },
      {
        path: 'add-announcement',
        loadChildren: () =>
          import('./announcement/announcement.module').then(
            (m) => m.AnnouncementModule
          ),
      },
      {
        path: 'add-career',
        loadChildren: () =>
          import('./career/career.module').then((m) => m.CareerModule),
      },
      {
        path: 'add-legislative',
        loadChildren: () =>
          import('./legislative/legislative.module').then(
            (m) => m.LegislativeModule
          ),
      },
      {
        path: 'add-transparency',
        loadChildren: () =>
          import('./transparency/transparency.module').then(
            (m) => m.TransparencyModule
          ),
      },
      {
        path: 'add-tourism',
        loadChildren: () =>
          import('./tourism/tourism.module').then((m) => m.TourismModule),
      },
      {
        path: 'add-citizen-charter',
        loadChildren: () =>
          import('./citizen-charter/citizen-charter.module').then(
            (m) => m.CitizenCharterModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageContentMngmntRoutingModule {}
