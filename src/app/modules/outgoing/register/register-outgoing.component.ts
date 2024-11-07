import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Department } from 'app/types/department.type';
import { User } from 'app/types/user.type';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { DocumentType } from 'app/types/document-type.type';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DocumentService } from 'app/modules/setting/document/document.service';

@Component({
    selector: 'register-outgoing',
    templateUrl: './register-outgoing.component.html',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
        MatIconModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule]
})
export class RegisterOutgoingComponent implements OnInit {

    registerDocumentForm: FormGroup;
    selectedFiles: File[] = [];
    departments: Department[] = [];
    documentTypes: DocumentType[] = [];
    selectedDepartment: Department;
    users: User[] = [];
    today = new Date();

    constructor(
        private _formBuilder: FormBuilder,
        private _documentService: DocumentService,
        private _departmentService: DepartmentService,
        private _documentTypeService: DocumentTypeService,
        private _userService: UserService
    ) { }

    ngOnInit(): void {
        this.registerDocumentForm = this._formBuilder.group({
            code: [null, [Validators.required]],
            issuingAgency: [null, [Validators.required]],
            name: [null, [Validators.required]],
            isImportant: [false, [Validators.required]],
            content: [null],
            documentTypeId: [null],
            receiverId: [null, [Validators.required]],
            dueDate: [null, [Validators.required]],
            isInternal: [true, [Validators.required]],
            isArchived: [false, [Validators.required]],
        });

        this._departmentService.departments$.subscribe(departments => {
            this.departments = departments
        });

        this._documentTypeService.documentTypes$.subscribe(documentTypes => {
            this.documentTypes = documentTypes
        });
    }

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            const files: FileList = input.files;
            // Lặp qua các file đã chọn và xử lý chúng
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                this.selectedFiles.push(file);
                console.log(file.name); // Ví dụ: log ra tên file
                // Bạn có thể xử lý file ở đây, ví dụ upload hoặc kiểm tra kích thước, tên file, v.v.
            }
        }
        input.value = '';
    }

    clearSelectedFiles() {
        this.selectedFiles = [];
    }

    onSubmit(): void {
        if (this.selectedFiles.length === 0) {
            console.error("Vui lòng chọn ít nhất một file.");
            return;
        }

        const formData = new FormData();

        Object.keys(this.registerDocumentForm.controls).forEach(key => {
            const value = this.registerDocumentForm.get(key).value;
            formData.append(key, value != null ? value : '');
        });

        // Thêm từng file vào FormData
        this.selectedFiles.forEach((file) => {
            formData.append('attachments', file); // Key 'files' sẽ là tên để server nhận diện
        });

        this._documentService.createOutgoingDocument(formData).subscribe();
    }

    onDepartmentChanged(event: any) {
        this._userService.getUsers({ departmentId: event.value.id }).subscribe(users => {
            console.log(users);

            this.users = users;
        })
    }

    onDraftSave() {
        if (this.selectedFiles.length === 0) {
            console.error("Vui lòng chọn ít nhất một file.");
            return;
        }

        const formData = new FormData();

        Object.keys(this.registerDocumentForm.controls).forEach(key => {
            const value = this.registerDocumentForm.get(key).value;
            formData.append(key, value != null ? value : '');
        });

        // Thêm từng file vào FormData
        this.selectedFiles.forEach((file) => {
            formData.append('attachments', file); // Key 'files' sẽ là tên để server nhận diện
        });

        this._documentService.createDraftDocument(formData).subscribe();
    }
}
