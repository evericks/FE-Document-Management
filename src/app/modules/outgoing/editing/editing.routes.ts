import { Routes } from '@angular/router';
import { EditingComponent } from './editing.component';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: EditingComponent,
        // data: { breadcrumb: 'Phiếu điều chỉnh tồn kho' },
    },
] as Routes;
