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
        redirectTo: 'welcome',
      },
      {
        path: 'welcome',
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
      {
        path: 'emergency-hotline',
        loadChildren: () =>
          import('./emergency-hotline/emergency-hotline.module').then(
            (m) => m.EmergencyHotlineModule
          ),
      },
      {
        path: 'citizen-charter',
        loadChildren: () =>
          import('./citizen-charter/citizen-charter.module').then(
            (m) => m.CitizenCharterModule
          ),
      },
      {
        path: 'career',
        loadChildren: () =>
          import('./career/career.module').then((m) => m.CareerModule),
      },
      {
        path: 'announcement',
        loadChildren: () =>
          import('./announcement/announcement.module').then(
            (m) => m.AnnouncementModule
          ),
      },
      {
        path: 'about-us',
        loadChildren: () =>
          import('./about-us/about-us.module').then((m) => m.AboutUsModule),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('./department/department.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'news',
        loadChildren: () =>
          import('./news/news.module').then((m) => m.NewsModule),
      },
      {
        path: 'services',
        loadChildren: () =>
          import('./services/services.module').then((m) => m.ServicesModule),
      },
      {
        path: 'bids-awards',
        loadChildren: () =>
          import('./bids-awards/bids-awards.module').then(
            (m) => m.BidsAwardsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPagePortalRoutingModule {}
