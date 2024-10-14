import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserHeaderComponent } from './header/user-header.component';
import { UserComponent } from './user.component';
import { inject } from '@angular/core';
import { UserService } from './user.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: UserComponent,
        children: [
            {
                path: 'header',
                component: UserHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            roles: inject(UserService).getUsers(),
                        }),
                },
            },
        ],
    },
] as Routes;
