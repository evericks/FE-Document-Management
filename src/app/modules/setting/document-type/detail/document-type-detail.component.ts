import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CustomPipesModule } from '@fuse/pipes/custome-pipe.module';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { Observable } from 'rxjs';
import { DocumentTypeService } from '../document-type.service';
import { DocumentType } from 'app/types/document-type.type';
import { ProcessService } from '../../process/process.service';
import { MatSelectModule } from '@angular/material/select';
import { ColDef, GridApi, GridOptions } from 'ag-grid-enterprise';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { AgGridModule } from 'ag-grid-angular';

@Component({
    selector: 'document-type-detail',
    templateUrl: './document-type-detail.component.html',
    standalone: true,
    imports: [CommonModule, CustomPipesModule, MatButtonModule,
        MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatIconModule, MatSelectModule, AgGridModule]
})
export class DocumentTypeDetailComponent implements OnInit {

    documentTypeForm: FormGroup;
    documentType$: Observable<DocumentType>;
    processes: any[] = [];

    private gridApi: GridApi;
    rowData: any[] = [];

    gridOptions: GridOptions = {
        ...globalGridOptions,
        onGridReady: (params) => {
            this.gridApi = params.api;
        }
    }

    colDefs: ColDef[];

    initColDefs() {
        this.colDefs = [
            {
                headerName: 'Hành Động',
                field: 'actions',
                cellRenderer: 'actionCellRenderer',
                sortable: false,
                filter: false,
                maxWidth: 200,
                cellClass: () => {
                    return 'flex justify-center item-center';
                },
                cellRendererParams: (params) => {
                    const isGroupRow = params.node.group;
                    return {
                        display: !isGroupRow,
                        onRemove: this.onRemoveButtonClicked.bind(this),
                        showUpdateIcon: false
                    };
                }
            },
            {
                field: 'name',
                headerName: 'Tên Thông Tin Thêm',
                filter: 'agTextColumnFilter',
                editable: true,
            },
            {
                field: 'description',
                headerName: 'Mô Tả',
                filter: 'agTextColumnFilter',
                editable: true,
            },
        ];
    }

    constructor(
        private _documentTypeService: DocumentTypeService,
        private _processService: ProcessService,
        private _formBuilder: FormBuilder,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this._processService.processes$.subscribe(processes => {
            this.processes = processes
        })
        this.documentType$ = this._documentTypeService.documentType$;
        this.documentType$.subscribe(documentType => {
            this.documentTypeForm = this._formBuilder.group({
                name: [documentType.name, [Validators.required]],
                processId: [documentType.processId, [Validators.required]],
                additionalInformations: [null]
            });
            this.rowData = documentType.additionalInformations;
            this.initColDefs();
        });
    }

    onRemoveButtonClicked(data) {
        this._fuseConfirmationService.open({
            title: 'Warning',
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.gridApi.applyTransaction({ remove: [data] });
                this.rowData = this.rowData.filter(element => element.id !== data.id);
            }
        })
    }

    onSubmitButtonClicked(id: string) {
        this.documentTypeForm.controls['additionalInformations'].setValue(this.rowData);
        if (this.documentTypeForm.valid) {
            this._documentTypeService.updateDocumentType(id, this.documentTypeForm.value).subscribe(() => {

            })
        }
    }

    onAddButtonClicked() {
        const newRow = {
            id: (this.rowData.length + 1).toString(),
            name: null,
            description: null
        };
        // Thêm hàng mới vào đầu mảng
        this.rowData = [...this.rowData, newRow];
    }

    goBack() {
        this._router.navigate(['/incoming-document-types/receive']);
    }
}
