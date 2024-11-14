import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { OrganizationHeaderComponent } from './header/organization-header.component';
import { OrganizationComponent } from './organization.component';
import { inject } from '@angular/core';
import { OrganizationService } from './organization.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: OrganizationComponent,
        children: [
            {
                path: 'header',
                component: OrganizationHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            organizations: inject(OrganizationService).getOrganizations(),
                        }),
                },
            },
        ],
    },
] as Routes;
