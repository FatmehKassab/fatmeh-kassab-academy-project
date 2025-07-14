import { Routes } from '@angular/router';
import { SignInComponent } from './pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { ProductsComponent } from './pages/products/products.component';
import { AboutComponent } from './pages/about/about.component';


export const routes: Routes = [
  { path: 'about', component: AboutComponent, data: { title: 'About' } },
  { path: 'products', component: ProductsComponent, data: { title: 'Products' } },
  { path: 'sign-in', component: SignInComponent, data: { title: 'Sign In' } },
  { path: 'sign-up', component: SignUpComponent, data: { title: 'Sign Up' } },
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/sign-in' }
];
