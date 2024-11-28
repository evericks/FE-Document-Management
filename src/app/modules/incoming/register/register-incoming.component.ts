import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { PreviewComponent } from 'app/modules/common/preview/preview.component';
import { DepartmentService } from 'app/modules/setting/department/department.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { OrganizationService } from 'app/modules/setting/organization/organization.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { Department } from 'app/types/department.type';
import { DocumentType } from 'app/types/document-type.type';
import { Organization } from 'app/types/organization.type';
import { User } from 'app/types/user.type';

@Component({
    selector: 'register-incoming',
    templateUrl: './register-incoming.component.html',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule,
        MatIconModule, MatSlideToggleModule, MatSelectModule, MatDatepickerModule]
})
export class RegisterIncomingComponent implements OnInit {

    registerDocumentForm: FormGroup;
    selectedFiles: File[] = [];
    departments: Department[] = [];
    organizations: Organization[] = [];
    documentTypes: DocumentType[] = [];
    selectedDepartment: Department;
    users: User[] = [];
    today = new Date();

    constructor(
        private _formBuilder: FormBuilder,
        private _documentService: DocumentService,
        private _departmentService: DepartmentService,
        private _documentTypeService: DocumentTypeService,
        private _userService: UserService,
        private _organizationService: OrganizationService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _matDialog: MatDialog
    ) { }

    ngOnInit(): void {
        this.registerDocumentForm = this._formBuilder.group({
            organizationId: [null, [Validators.required]],
            receivingAgencyId: ['ffb639e1-80ec-4985-ace7-e25f615323a4', [Validators.required]],
            name: [null, [Validators.required]],
            content: [null],
            receiverId: [null, [Validators.required]],
            dueDate: [null, [Validators.required]],
            isImportant: [false, [Validators.required]],
            isInternal: [false, [Validators.required]],
            isArchived: [false, [Validators.required]],
        });

        this._departmentService.departments$.subscribe(departments => {
            this.departments = departments
        });

        this._organizationService.organizations$.subscribe(organizations => {
            this.organizations = organizations;
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

        this._documentService.createIncomingDocument(formData).subscribe({
            next: () => {

            },
            error: () => {
                this._fuseConfirmationService.open({
                    title: 'Thất bại',
                    message: 'Mã văn bản đã tồn tại',
                })
            }
        });
    }

    onDepartmentChanged(event: any) {
        this._userService.getUsers({ departmentId: event.value.id }).subscribe(users => {
            this.users = users;
        })
    }

    getFileExtension(fileName: string) {
        return fileName.split('.').pop();
    }

    getFileUrl(file: File) {
        return URL.createObjectURL(file);
    }

    openPreviewDialog(file) {
        const formData: FormData = new FormData();
        formData.append('file', file);
        this._documentService.uploadFile(formData).subscribe(result => {
            this._matDialog.open(PreviewComponent, {
                width: '1080px',
                height: '680px',
                data: {
                    fileName: result.fileName,
                    fileUrl: result.url
                }
            })
        });
    }
}
