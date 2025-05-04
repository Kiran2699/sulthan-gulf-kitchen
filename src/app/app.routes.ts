import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { FoodMenusComponent } from './food-menus/food-menus.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { AdminLoginComponent } from './admin/admin-login/admin-login.component';
import { AdminFoodMenuComponent } from './admin/admin-food-menu/admin-food-menu.component';
import { AdminFoodOrdersComponent } from './admin/admin-food-orders/admin-food-orders.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: LandingPageComponent },
    { path: 'menu', component: FoodMenusComponent },
    { path: 'contact-us', component: ContactUsComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/food-menu', component: AdminFoodMenuComponent },
    { path: 'admin/food-orders', component: AdminFoodOrdersComponent },
    { path: '**', redirectTo: '/home' }
];