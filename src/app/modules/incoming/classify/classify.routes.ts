import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { forkJoin } from 'rxjs';
import { ClassifyDetailComponent } from './detail/classify-detail.component';
import { ClassifyHeaderComponent } from './header/classify-header.component';
import { ClassifyComponent } from './classify.component';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ClassifyComponent,
        children: [
            {
                path: 'header',
                component: ClassifyHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            documents: inject(DocumentService).getUserUnclassifiedDocuments(),
                            users: inject(UserService).getUsers(),
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
                        }),
                },
            },
            {
                path: ':id',
                component: ClassifyDetailComponent,
                resolve: {
                    combinedData: (activatedRoute: ActivatedRouteSnapshot) => {
                        const id = activatedRoute.params['id'];
                        return forkJoin({
                            document: inject(DocumentService).getDocumentById(id),
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
