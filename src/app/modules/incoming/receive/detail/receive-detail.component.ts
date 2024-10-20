import { Component, OnInit } from '@angular/core';
import { ReceiveDocumentService } from '../receive.service';
import { Observable } from 'rxjs';
import { Document } from 'app/types/document.type';
import { CommonModule } from '@angular/common';
import { DocumentStatus } from 'app/types/document-status.type';
import { DocumentType } from 'app/types/document-type.type';
import { User } from 'app/types/user.type';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { getItemNameById } from 'app/utils/common.utils';
import { CustomPipesModule } from '@fuse/pipes/custome-pipe.module';
import { Department } from 'app/types/department.type';
import { DepartmentService } from 'app/modules/setting/department/department.service';

@Component({
    selector: 'receive-detail',
    templateUrl: './receive-detail.component.html',
    standalone: true,
    imports: [CommonModule, CustomPipesModule]
})
export class ReceiveDetailComponent implements OnInit {

    receiveDocument$: Observable<Document>;
    documentTypes: DocumentType[] = [];
    documentStatuses: DocumentStatus[] = [];
    departments: Department[] = [];
    users: User[] = [];

    constructor(
        private _receiveDocumentService: ReceiveDocumentService,
        private _userService: UserService,
        private _documentStatusService: DocumentStatusService,
        private _departmentService: DepartmentService,
        private _documentTypeService: DocumentTypeService
    ) { }

    ngOnInit(): void {
        this.receiveDocument$ = this._receiveDocumentService.receiveDocument$;

        this._userService.users$.subscribe(users => {
            this.users = users;
        });

        this._documentStatusService.documentStatuses$.subscribe(documentStatuses => {
            this.documentStatuses = documentStatuses;
        });

        this._departmentService.departments$.subscribe(departments => {
            this.departments = departments;
        });

        this._documentTypeService.documentTypes$.subscribe(documentTypes => {
            this.documentTypes = documentTypes;
        });
    }

    displayUserWithId(id: string) {
        return getItemNameById(this.users, id);
    }

    displayDepartmentWithId(id: string) {
        return getItemNameById(this.departments, id);
    }

    displayDocumentStatusWithId(id: string) {
        return getItemNameById(this.documentStatuses, id);
    }

    displayDocumentTypeWithId(id: string) {
        return getItemNameById(this.documentTypes, id);
    }
}
