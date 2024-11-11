import { ActivatedRouteSnapshot, Routes } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DocumentTypeHeaderComponent } from './header/document-type-header.component';
import { DocumentTypeComponent } from './document-type.component';
import { inject } from '@angular/core';
import { DocumentTypeService } from './document-type.service';
import { DocumentTypeDetailComponent } from './detail/document-type-detail.component';
import { DocumentService } from '../document/document.service';
import { UserService } from '../user/user.service';
import { DepartmentService } from '../department/department.service';
import { DocumentStatusService } from '../document-status/document-status.service';
import { ProcessService } from '../process/process.service';

export default [
    {
        path: '',
        redirectTo: 'header',
        pathMatch: 'full',
    },
    {
        path: '',
        component: DocumentTypeComponent,
        children: [
            {
                path: 'header',
                component: DocumentTypeHeaderComponent,
                resolve: {
                    combinedData: () =>
                        forkJoin({
                            documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                            processes: inject(ProcessService).getProcesses(),
                        }),
                },
            }, {
                path: ':id',
                component: DocumentTypeDetailComponent,
                resolve: {
                    combinedData: (activatedRoute: ActivatedRouteSnapshot) => {
                        const id = activatedRoute.params['id'];
                        return forkJoin({
                            documentType: inject(DocumentTypeService).getDocumentTypeById(id),
                        })
                    }
                },
            },
        ],
    },
] as Routes;
