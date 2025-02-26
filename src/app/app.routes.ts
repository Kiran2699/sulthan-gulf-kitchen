import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FoodMenusComponent } from './food-menus/food-menus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

export const routes: Routes = [
    { path: 'home', component: LandingPageComponent },
    { path: 'menu', component: FoodMenusComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: '', redirectTo: 'home', pathMatch: 'full' }
];