import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';


export const routes: Routes = [
  { path: 'not-found', component: NotFoundComponent, data: { title: 'Not Found' } },
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  { path: 'profile', component: ProfileComponent, data: { title: 'Profile' } },
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'products', component: ProductsComponent, data: { title: 'Products' } },
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/not-found' }
];
