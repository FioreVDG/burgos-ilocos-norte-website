import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page-portal/landing-page-portal.module').then(
        (m) => m.LandingPagePortalModule
      ),
  },
  {
    path: 'landing-page',
    loadChildren: () =>
      import('./landing-page-portal/landing-page-portal.module').then(
        (m) => m.LandingPagePortalModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
