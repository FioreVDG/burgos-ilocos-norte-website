import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

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
  {
    path: 'admin-login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },

  {
    path: 'content-management',
    loadChildren: () =>
      import(
        './landing-page-content-mngmnt/landing-page-content-mngmnt.module'
      ).then((m) => m.LandingPageContentMngmntModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
