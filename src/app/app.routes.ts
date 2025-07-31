import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductsComponent } from './pages/products/products.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/auth/guards/auth.guard';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { AdminComponent } from './pages/admin/admin.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';

export const routes: Routes = [
  { path: 'checkout', component: CheckoutComponent, data: { title: 'Checkout' } },
  { path: 'not-found', component: NotFoundComponent, data: { title: 'Not Found' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'admin', component: AdminComponent, data: { title: 'Admin' } }, 
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  // {  path: 'products',
  //   loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent),
  //   canActivate: [authGuard] },
  { path: 'products', component: ProductsComponent, data: { title: 'Products' } },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/not-found' }
];
