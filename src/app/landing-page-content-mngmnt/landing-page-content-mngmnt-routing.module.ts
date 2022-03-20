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
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingPageContentMngmntRoutingModule {}
