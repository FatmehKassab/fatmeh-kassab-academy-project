import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'products', component: ProductsComponent, data: { title: 'Products' } },
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },

];
