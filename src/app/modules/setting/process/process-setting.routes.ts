import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ProcessHeaderComponent } from './header/process-setting-header.component';
import { ProcessComponent } from './process-setting.component';
import { inject } from '@angular/core';
import { ProcessService } from './process.service';
import { ProcessCreateComponent } from './create/process-setting-create.component';
import { RoleService } from '../role/role.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ProcessComponent,
        children: [
            {
                path: 'header',
                component: ProcessHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            processes: inject(ProcessService).getProcesses(),
                            roles: inject(RoleService).getRoles(),
                        }),
                },
            },
            {
                path: 'create',
                component: ProcessCreateComponent,
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
