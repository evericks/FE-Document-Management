import { Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReceiveHeaderComponent } from './header/receive-header.component';
import { ReceiveComponent } from './receive.component';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ReceiveComponent,
        // data: { breadcrumb: 'Phiếu điều chỉnh tồn kho' },
        children: [
            {
                path: 'header',
                component: ReceiveHeaderComponent,
                // data: { breadcrumb: 'Danh Sách' },
                // resolve: {
                //     combinedData: () =>
                //         forkJoin({
                //             orderTypes: inject(OrderTypeService).getorderTypes(),
                //         }),
                // },
            },
        ],
    },
] as Routes;
