import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { RoleHeaderComponent } from './header/role-header.component';
import { RoleComponent } from './role.component';
import { inject } from '@angular/core';
import { RoleService } from './role.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: RoleComponent,
        children: [
            {
                path: 'header',
                component: RoleHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            roles: inject(RoleService).getRoles(),
                        }),
                },
            },
        ],
    },
] as Routes;
