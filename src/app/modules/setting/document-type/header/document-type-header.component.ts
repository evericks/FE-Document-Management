import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { formatToMedium } from 'app/utils/datetime.utils';
import { DocumentTypeService } from '../document-type.service';
import { getItemNameById } from 'app/utils/common.utils';
import { Process } from 'app/types/process.type';
import { ProcessService } from '../../process/process.service';

@Component({
    selector: 'document-type-header',
    templateUrl: './document-type-header.component.html',
    standalone: true,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule]
})
export class DocumentTypeHeaderComponent implements OnInit {

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    rowData: any[] = [];
    processes: Process[] = [];

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
                        onSave: this.onSaveButtonClicked.bind(this),
                        onEdit: this.onEditButtonClicked.bind(this),
                    };
                }
            },
            {
                field: 'name',
                headerName: 'Tên',
                filter: 'agTextColumnFilter',
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
                editable: true,
            },
            {
                field: 'processId',
                headerName: 'Quy Trình',
                filterValueGetter: (params) => getItemNameById(this.processes, params.data?.processId),
                cellEditor: 'autocompleteCellEditorRenderer',
                cellEditorParams: {
                    options: this.processes,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.processes, params.data?.processId),
                valueFormatter: (params) => getItemNameById(this.processes, params.data?.processId),
                editable: true,
            },
            {
                field: 'createdAt',
                headerName: 'Ngày Tạo',
                filter: 'agDateColumnFilter',
                valueFormatter: (params) => formatToMedium(params.value)
            },
        ];
    }

    constructor(
        private _documentTypeService: DocumentTypeService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _processService: ProcessService
    ) { }

    ngOnInit(): void {
        this._documentTypeService.documentTypes$.subscribe(documentTypes => {
            this.rowData = documentTypes;
        });

        this._processService.processes$.subscribe(processes => {
            this.processes = processes;
            this.initColDefs();
        })

        this.quickFilter.valueChanges.subscribe(value => {
            this.gridApi.setGridOption('quickFilterText', value);
        });
    }

    onAddButtonClicked() {
        if (this.rowData.some(x => x.isNew)) {
            return;
        }
        const newRow = {
            id: '',
            name: null,
            createdAt: new Date().toISOString(),
            isNew: true
        };
        // Thêm hàng mới vào đầu mảng
        this.rowData = [newRow, ...this.rowData];
    }

    onRemoveButtonClicked(data) {
        this._fuseConfirmationService.open({
            title: 'Warning',
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                if (data.isNew) {
                    this.gridApi.applyTransaction({ remove: [data] });
                    this.rowData.shift();
                } else {
                    this._documentTypeService.deleteDocumentType(data.id).subscribe(() => {
                        this.gridApi.applyTransaction({ remove: [data] });
                        this.rowData.shift();
                    });
                }
            }
        })
    }

    onCellValueChanged(data) {
        if (!data.isNew) {
            this._documentTypeService.updateDocumentType(data.id, data).subscribe();
        }
    }

    onSaveButtonClicked(data) {
        this._documentTypeService.createDocumentType(data).subscribe();
    }

    onEditButtonClicked(data) {
        this._router.navigate(['/settings/document-types', data.id]);
    }
}
