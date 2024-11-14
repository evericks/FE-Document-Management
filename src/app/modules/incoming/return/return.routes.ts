import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { forkJoin } from 'rxjs';
import { ReturnDetailComponent } from './detail/return-detail.component';
import { ReturnHeaderComponent } from './header/return-header.component';
import { ReturnComponent } from './return.component';
import { OrganizationService } from 'app/modules/setting/organization/organization.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: ReturnComponent,
        children: [
            {
                path: 'header',
                component: ReturnHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            documents: inject(DocumentService).getUserReturnDocuments(),
                            users: inject(UserService).getUsers(),
                            organizations: inject(OrganizationService).getOrganizations(),
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            documentStatuses: inject(DocumentStatusService).getDocumentStatuses(),
                        }),
                },
            },
            {
                path: ':id',
                component: ReturnDetailComponent,
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
