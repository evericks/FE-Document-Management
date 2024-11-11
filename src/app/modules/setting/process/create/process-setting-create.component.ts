import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-enterprise';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { ProcessService } from '../process.service';
import { getItemNameById } from 'app/utils/common.utils';
import { Role } from 'app/types/role.type';
import { RoleService } from '../../role/role.service';

@Component({
    selector: 'process-create',
    templateUrl: './process-setting-create.component.html',
    standalone: true,
    imports: [CommonModule, AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule]
})
export class ProcessCreateComponent implements OnInit {

    processForm: FormGroup;
    roles: Role[] = [];

    constructor(
        private _router: Router,
        private _fuseConfirmationService: FuseConfirmationService,
        private _formBuilder: FormBuilder,
        private _processService: ProcessService,
        private _roleService: RoleService
    ) { }

    ngOnInit(): void {
        this.processForm = this._formBuilder.group({
            name: [null, [Validators.required]],
            processSteps: [null]
        });

        this._roleService.roles$.subscribe(roles => {
            this.roles = roles;
            this.initColDefs();
        })
    }

    private gridApi: GridApi;
    rowData: any[] = [
    ];

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
                headerName: 'Tên',
                filter: 'agTextColumnFilter',
                editable: true,
            },
            {
                field: 'stepNumber',
                headerName: 'Thứ Tự',
                filter: 'agTextColumnFilter',
                editable: true,
            },
            {
                field: 'roleId',
                headerName: 'Chức Vụ Phụ Trách  ',
                filterValueGetter: (params) => getItemNameById(this.roles, params.data?.roleId || 'Không có'),
                cellEditor: 'autocompleteCellEditorRenderer',
                cellEditorParams: {
                    options: this.roles,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.roles, params.data?.roleId),
                valueFormatter: (params) => getItemNameById(this.roles, params.data?.roleId),
                editable: true,
            },
        ];
    }

    goBack() {
        this._router.navigate(['settings/processes']);
    }

    onRemoveButtonClicked(data) {
        this._fuseConfirmationService.open({
            title: 'Warning',
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                this.gridApi.applyTransaction({ remove: [data] });
                this.rowData.shift();
            }
        })
    }

    onAddButtonClicked() {
        const newRow = {
            id: this.rowData.length + 1,
            name: null,
            stepNumber: this.rowData.length + 1,
        };
        // Thêm hàng mới vào đầu mảng
        this.rowData = [...this.rowData, newRow];
    }

    onSave() {
        if (this.processForm.valid) {
            this.processForm.controls['processSteps'].setValue(this.rowData);
            this._processService.createProcess(this.processForm.value).subscribe(() => {
                this.goBack();
            });
        }
    }
}
