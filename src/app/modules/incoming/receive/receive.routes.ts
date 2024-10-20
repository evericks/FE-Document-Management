import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ReceiveHeaderComponent } from './header/receive-header.component';
import { ReceiveComponent } from './receive.component';
import { inject } from '@angular/core';
import { ReceiveDocumentService } from './receive.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { ReceiveDetailComponent } from './detail/receive-detail.component';
import { DepartmentService } from 'app/modules/setting/department/department.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ReceiveComponent,
        children: [
            {
                path: 'header',
                component: ReceiveHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            documents: inject(ReceiveDocumentService).getDocuments(),
                            users: inject(UserService).getUsers(),
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
                        }),
                },
            },
            {
                path: ':id',
                component: ReceiveDetailComponent,
                resolve: {
                    combinedData: (activatedRoute: ActivatedRouteSnapshot) => {
                        const id = activatedRoute.params['id'];
                        return forkJoin({
                            document: inject(ReceiveDocumentService).getDocumentById(id),
                            users: inject(UserService).getUsers(),
                            departments: inject(DepartmentService).getDepartments(),
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
                        })
                    }
                },
            },
        ],
    },
] as Routes;
