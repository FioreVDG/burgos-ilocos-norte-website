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
        redirectTo: 'add-news',
      },
      {
        path: 'add-news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'content',
        loadChildren: () =>
          import('./contents/contents.module').then((m) => m.ContentsModule),
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
      {
        path: 'add-department',
        loadChildren: () =>
          import('./department/department.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'add-services',
        loadChildren: () =>
          import('./services/services.module').then((m) => m.ServicesModule),
      },
      {
        path: 'add-bid',
        loadChildren: () =>
          import('./bids/bids.module').then((m) => m.BidsModule),
      },
      {
        path: 'add-hotlines',
        loadChildren: () =>
          import('./hotlines/hotlines.module').then((m) => m.HotlinesModule),
      },
      {
        path: 'add-geographic-info',
        loadChildren: () =>
          import('./geographic-info/geographic-info.module').then(
            (m) => m.GeographicInfoModule
          ),
      },
      {
        path: 'update-contactUs',
        loadChildren: () =>
          import('./contact-us/contact-us.module').then(
            (m) => m.ContactUsModule
          ),
      },
      {
        path: 'update-logo_meaning',
        loadChildren: () =>
          import('./meaning-logo/meaning-logo.module').then(
            (m) => m.MeaningLogoModule
          ),
      },
      {
        path: 'update-public_servant',
        loadChildren: () =>
          import('./public-servants/public-servants.module').then(
            (m) => m.PublicServantsModule
          ),
      },
      {
        path: 'update-history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageContentMngmntRoutingModule {}
