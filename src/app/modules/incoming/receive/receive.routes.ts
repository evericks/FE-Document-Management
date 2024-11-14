import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { forkJoin } from 'rxjs';
import { ReceiveDetailComponent } from './detail/receive-detail.component';
import { ReceiveHeaderComponent } from './header/receive-header.component';
import { ReceiveComponent } from './receive.component';
import { OrganizationService } from 'app/modules/setting/organization/organization.service';

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
                            documents: inject(DocumentService).getUserReceiveDocuments(),
                            users: inject(UserService).getUsers(),
                            organizations: inject(OrganizationService).getOrganizations(),
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
                            document: inject(DocumentService).getDocumentById(id),
                            users: inject(UserService).getUsers(),
                            organizations: inject(OrganizationService).getOrganizations(),
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
