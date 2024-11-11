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
import { globalGridOptions, masterDetailDefaultColDef } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { formatToMedium } from 'app/utils/datetime.utils';
import { ProcessService } from '../process.service';
import { Role } from 'app/types/role.type';
import { RoleService } from '../../role/role.service';
import { getItemNameById } from 'app/utils/common.utils';

@Component({
    selector: 'process-header',
    templateUrl: './process-setting-header.component.html',
    standalone: true,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule]
})
export class ProcessHeaderComponent implements OnInit {

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    rowData: any[] = [];
    roles: Role[] = [];

    detailCellRendererParams = {
        detailGridOptions: {
            defaultColDef: masterDetailDefaultColDef,
            columnDefs: [
                {
                    field: 'stepNumber',
                    headerName: 'Số Thứ Tự',
                },
                {
                    field: 'name',
                    headerName: 'Tên',
                },
                {
                    field: 'roleId',
                    headerName: 'Chức Vụ Phụ Trách',
                    valueGetter: (params) => getItemNameById(this.roles, params.data?.roleId || 'Không có'),
                },
            ],
        },
        getDetailRowData: (params) => {
            params.successCallback(params.data.processSteps);
        },
    };

    gridOptions: GridOptions = {
        ...globalGridOptions,
        masterDetail: true,
        detailCellRendererParams: this.detailCellRendererParams,
        onGridReady: (params) => {
            this.gridApi = params.api;
        }
    }

    colDefs: ColDef[] = [
        {
            headerName: 'Actions',
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
                    onEdit: this.onEditButtonClicked.bind(this),
                    showExpandIcon: true,
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
            field: 'createdAt',
            headerName: 'Ngày Tạo',
            filter: 'agDateColumnFilter',
            valueFormatter: (params) => formatToMedium(params.value)
        },
    ];

    constructor(
        private _processService: ProcessService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router,
        private _roleService: RoleService
    ) { }

    ngOnInit(): void {
        this._processService.processes$.subscribe(processes => {
            this.rowData = processes;
        });

        this._roleService.roles$.subscribe(roles => {
            this.roles = roles
        })

        this.quickFilter.valueChanges.subscribe(value => {
            this.gridApi.setGridOption('quickFilterText', value);
        });
    }

    onAddButtonClicked() {
        this._router.navigate(['/settings/processes/create']);
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
                    this._processService.deleteProcess(data.id).subscribe(() => {
                        this.gridApi.applyTransaction({ remove: [data] });
                        this.rowData.shift();
                    });
                }
            }
        })
    }

    onCellValueChanged(data) {
        if (!data.isNew) {
            this._processService.updateProcess(data.id, data).subscribe();
        }
    }

    onEditButtonClicked(data) {
        this._router.navigate(['/settings/processes', data.id]);
    }
}
