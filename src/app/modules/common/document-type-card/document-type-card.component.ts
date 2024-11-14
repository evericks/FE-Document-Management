import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DocumentType } from 'app/types/document-type.type';
import { combineLatest, map, Observable, startWith } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogRef } from '@angular/material/dialog';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';

@Component({
    selector: 'document-type-card',
    templateUrl: './document-type-card.component.html',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule,
        MatIconModule
    ]
})
export class DocumentTypeCardComponent implements OnInit {
    filter: FormControl = new FormControl(null);
    documentTypes$: Observable<DocumentType[]>;
    selectedDocumentType: DocumentType;

    constructor(
        private _documentTypeService: DocumentTypeService,
        private _fuseConfirmationService: FuseConfirmationService,
        public matDialogRef: MatDialogRef<DocumentTypeCardComponent>,
    ) {

    }

    ngOnInit(): void {
        this.documentTypes$ = this._documentTypeService.documentTypes$;
        this.documentTypes$ = combineLatest([
            this.filter.valueChanges.pipe(startWith('')),
            this.documentTypes$
        ]).pipe(
            map(([filterValue, documentTypes]) =>
                documentTypes.filter(documentType =>
                    documentType.name.toLowerCase().includes(filterValue.toLowerCase())
                )
            )
        );
    }

    documentTypeSelected(documentType: DocumentType) {
        if (this.selectedDocumentType) {
            if (documentType.id === this.selectedDocumentType.id) {
                this.selectedDocumentType = null;
            } else {
                this.selectedDocumentType = documentType;
            }
        } else {
            this.selectedDocumentType = documentType;
        }
    }

    submit() {
        this._fuseConfirmationService.open({
            title: 'Xác nhận',
            message: 'Bạn chắc chắn muốn phân loại văn bản văn bản này',
            icon: {
                color: 'info',
            },
            actions: {
                cancel: {
                    label: 'Hủy'
                },
                confirm: {
                    color: 'primary',
                    label: 'Xác Nhận'
                }
            }
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                if (this.selectedDocumentType) {
                    console.log(this.selectedDocumentType);
                    this.matDialogRef.close(this.selectedDocumentType);
                }
            }
        });
    }
}
