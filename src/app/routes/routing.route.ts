import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisersPage } from '../views/advertisers/advertisers.component';

const appRoutes: Routes = [
    {
        path: '',
        component: AdvertisersPage,
        pathMatch: 'full'
    },
    {
        path: 'advertisers',
        component: AdvertisersPage,
        pathMatch: 'full'
    }
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(appRoutes,
    {
        useHash: true
    }
);