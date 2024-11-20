import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { DocumentService } from 'app/modules/setting/document/document.service';

@Component({
    selector: 'return-dialog',
    templateUrl: './return-dialog.component.html',
    standalone: true,
    imports: [CommonModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, FormsModule, MatButtonModule,
        MatIconModule
    ]
})
export class ReturnDialogComponent implements OnInit {

    note: FormControl = new FormControl(null, [Validators.required, Validators.minLength(10)]);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<ReturnDialogComponent>,
        private _documentService: DocumentService
    ) { }

    ngOnInit(): void { }

    submit() {
        if (this.note.valid) {
            this._documentService.returnDocument(this.data.id, { message: this.note.value }).subscribe(() => {
                this.matDialogRef.close('success');
            })
        }
    }
}
