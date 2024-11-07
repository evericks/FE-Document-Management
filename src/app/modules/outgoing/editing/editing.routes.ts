import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { forkJoin } from 'rxjs';
import { EditingComponent } from './editing.component';
import { EditingHeaderComponent } from './header/editing-header.component';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: EditingComponent,
        children: [
            {
                path: 'header',
                component: EditingHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            documents: inject(DocumentService).getUserDraftDocuments(),
                            users: inject(UserService).getUsers(),
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
                        }),
                },
            },
            // {
            //     path: ':id',
            //     component: ReceiveDetailComponent,
            //     resolve: {
            //         combinedData: (activatedRoute: ActivatedRouteSnapshot) => {
            //             const id = activatedRoute.params['id'];
            //             return forkJoin({
            //                 document: inject(DocumentService).getDocumentById(id),
            //                 users: inject(UserService).getUsers(),
            //                 departments: inject(DepartmentService).getDepartments(),
            //                 documentTypes: inject(DocumentTypeService).getDocumentTypes(),
            //                 documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
            //             })
            //         }
            //     },
            // },
        ],
    },
] as Routes;
