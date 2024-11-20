import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { Department } from 'app/types/department.type';
import { User } from 'app/types/user.type';

@Component({
    selector: 'send',
    templateUrl: './send.component.html',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule,
        MatIconModule, MatSelectModule
    ]
})
export class SendComponent implements OnInit {
    formSend: FormGroup;
    departments: Department[] = [];
    users: User[] = [];

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<SendComponent>,
        private _departmentService: DepartmentService,
        private _documentService: DocumentService,
        private _userService: UserService,
        private _formBuilder: FormBuilder
    ) { }

    ngOnInit(): void {
        this._departmentService.departments$.subscribe(departments => {
            this.departments = departments
        });

        this.formSend = this._formBuilder.group({
            receiverId: [null, Validators.required],
            message: [null, [Validators.required, Validators.minLength(10)]]
        });
    }

    onDepartmentChanged(event: any) {
        this._userService.getUsers({ departmentId: event.value.id }).subscribe(users => {
            this.users = users;
        })
    }

    submit() {
        this._documentService.sendDocument(this.data.id, this.formSend.value).subscribe(() => {
            this.matDialogRef.close('success');
        });
    }
}
