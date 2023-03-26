import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ListComponent as ProductListComponent } from './admin/products/list/list.component';
import { FormComponent as ProductFormComponent } from './admin/products/form/form.component';
import { ListComponent as UserListComponent } from './admin/users/list/list.component';
import { FormComponent as UserFormComponent } from './admin/users/form/form.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SendCheckComponent } from './auth/send-check/send-check.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'auth/login',
    component: LoginComponent,
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
  },
  {
    path: 'auth/forgot-password',
    component: ForgotPasswordComponent,
  },
  {
    path: 'auth/send-check',
    component: SendCheckComponent,
  },
  {
    path: 'my-profile',
    component: ProfileComponent,
  },
  {
    path: 'admin/products',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    component: ProductListComponent,
  },
  {
    path: 'admin/products/add',
    component: ProductFormComponent,
  },
  {
    path: 'admin/products/edit/:id',
    component: ProductFormComponent,
  },
  {
    path: 'admin/users',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    component: UserListComponent,
  },
  {
    path: 'admin/users/add',
    component: UserFormComponent,
  },
  {
    path: 'admin/users/edit/:id',
    component: UserFormComponent,
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
