import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { UserHeaderComponent } from './header/user-header.component';
import { UserComponent } from './user.component';
import { inject } from '@angular/core';
import { UserService } from './user.service';
import { RoleService } from '../role/role.service';
import { DepartmentService } from '../department/department.service';

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
                            users: inject(UserService).getUsers(),
                            roles: inject(RoleService).getRoles(),
                            departments: inject(DepartmentService).getDepartments(),
                        }),
                },
            },
        ],
    },
] as Routes;
