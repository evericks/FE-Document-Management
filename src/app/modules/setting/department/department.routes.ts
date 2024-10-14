import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DepartmentHeaderComponent } from './header/department-header.component';
import { DepartmentComponent } from './department.component';
import { inject } from '@angular/core';
import { DepartmentService } from './department.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: DepartmentComponent,
        children: [
            {
                path: 'header',
                component: DepartmentHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            departments: inject(DepartmentService).getDepartments(),
                        }),
                },
            },
        ],
    },
] as Routes;
