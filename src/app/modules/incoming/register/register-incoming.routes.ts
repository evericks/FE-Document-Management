import { Routes } from '@angular/router';
import { RegisterIncomingComponent } from './register-incoming.component';
import { forkJoin } from 'rxjs';
import { inject } from '@angular/core';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';

export default [
    {
        path: '',
        component: RegisterIncomingComponent,
        resolve: {
            combinedData: () =>
                forkJoin({
                    departments: inject(DepartmentService).getDepartments(),
                    documentTypes: inject(DocumentTypeService).getDocumentTypes(),
                }),
        },
    },
] as Routes;
