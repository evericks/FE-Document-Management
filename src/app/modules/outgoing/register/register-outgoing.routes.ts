import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { forkJoin } from 'rxjs';
import { RegisterOutgoingComponent } from './register-outgoing.component';

export default [
    {
        path: '',
        component: RegisterOutgoingComponent,
        resolve: {
            combinedData: () =>
                forkJoin({
                    departments: inject(DepartmentService).getDepartments(),
                    documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                }),
        },
    },
] as Routes;
