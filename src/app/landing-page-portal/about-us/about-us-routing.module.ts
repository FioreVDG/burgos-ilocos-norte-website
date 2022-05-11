import { AboutUsComponent } from './about-us.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AboutUsComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'history',
      },
      {
        path: 'history',
        loadChildren: () =>
          import('./history/history.module').then((m) => m.HistoryModule),
      },
      {
        path: 'logo-meaning',
        loadChildren: () =>
          import('./logo-meaning/logo-meaning.module').then(
            (m) => m.LogoMeaningModule
          ),
      },
      {
        path: 'geographic-info',
        loadChildren: () =>
          import('./geographic-info/geographic-info.module').then(
            (m) => m.GeographicInfoModule
          ),
      },
      {
        path: 'mission-vision',
        loadChildren: () =>
          import('./mission-vision/mission-vision.module').then(
            (m) => m.MissionVisionModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutUsRoutingModule {}
