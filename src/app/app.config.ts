import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { provideStore } from '@ngrx/store';
import { cartReducer } from './shared/store/cart/cart.reducer';




export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),  provideHttpClient(),provideAnimations(),providePrimeNG({
    theme: {
        preset: Aura,
        options: {
            darkModeSelector: false || 'none'
        }
    }
}),
 provideStore({ cart: cartReducer }),
   
  ]
};
