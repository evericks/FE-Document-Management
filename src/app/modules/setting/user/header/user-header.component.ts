import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { Department } from 'app/types/department.type';
import { Role } from 'app/types/role.type';
import { getItemNameById } from 'app/utils/common.utils';
import { formatToMedium, formatToMediumDate } from 'app/utils/datetime.utils';
import { DepartmentService } from '../../department/department.service';
import { RoleService } from '../../role/role.service';
import { UserService } from '../user.service';

@Component({
    selector: 'user-header',
    templateUrl: './user-header.component.html',
    standalone: true,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule]
})
export class UserHeaderComponent implements OnInit {

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    rowData: any[] = [];
    roles: Role[] = [];
    departments: Department[] = [];

    gridOptions: GridOptions = {
        ...globalGridOptions,
        onGridReady: (params) => {
            this.gridApi = params.api;
            const allColumnIds = [];
            this.gridApi.getAllGridColumns().forEach(column => {
                allColumnIds.push(column.getId());
            });
            this.gridApi.autoSizeColumns(allColumnIds);
        }
    }

    colDefs: ColDef[];

    constructor(
        private _userService: UserService,
        private _roleService: RoleService,
        private _departmentService: DepartmentService,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this._userService.users$.subscribe(users => {
            this.rowData = users;
        });

        this._roleService.roles$.subscribe(roles => {
            this.roles = roles;
        });

        this._departmentService.departments$.subscribe(departments => {
            this.departments = departments;
        });

        this.initColDefs();

        this.quickFilter.valueChanges.subscribe(value => {
            this.gridApi.setGridOption('quickFilterText', value);
        });
    }

    initColDefs() {
        this.colDefs = [
            {
                headerName: 'Actions',
                field: 'actions',
                cellRenderer: 'actionCellRenderer',
                sortable: false,
                filter: false,
                cellClass: () => {
                    return 'flex justify-center item-center';
                },
                cellRendererParams: (params) => {
                    const isGroupRow = params.node.group;
                    return {
                        display: !isGroupRow,
                        onRemove: this.onRemoveButtonClicked.bind(this),
                        onSave: this.onSaveButtonClicked.bind(this),
                        showUpdateIcon: false
                    };
                }
            },
            {
                field: 'username',
                headerName: 'Username',
                filter: 'agTextColumnFilter',
                editable: (params) => params.data.isNew
            },
            {
                field: 'name',
                headerName: 'Name',
                filter: 'agTextColumnFilter',
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
                editable: true,
            },
            {
                field: 'roleId',
                headerName: 'Role',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.roles, params.data?.roleId),
                cellEditorParams: {
                    options: this.roles,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.roles, params.data?.roleId),
                valueFormatter: (params) => getItemNameById(this.roles, params.data?.roleId),
                onCellValueChanged: (params) => {
                    this.onCellValueChanged(params.data);
                },
                editable: true,
            },
            {
                field: 'departmentId',
                headerName: 'Department',
                filterValueGetter: (params) => getItemNameById(this.departments, params.data?.departmentId),
                cellEditor: 'autocompleteCellEditorRenderer',
                cellEditorParams: {
                    options: this.departments,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.departments, params.data?.departmentId),
                valueFormatter: (params) => getItemNameById(this.departments, params.data?.departmentId),
                onCellValueChanged: (params) => {
                    this.onCellValueChanged(params.data);
                },
                editable: true,
            },
            {
                field: 'gender',
                headerName: 'Gender',
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: ['Male', 'Female', 'Other'],
                },
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            },
            {
                field: 'phone',
                headerName: 'Phone',
                filter: 'agTextColumnFilter',
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
                editable: true,
            },
            {
                field: 'birthdate',
                headerName: 'Birthdate',
                filter: 'agDateColumnFilter',
                cellEditor: 'agDateCellEditor',
                cellDataType: 'date',
                valueFormatter: (params) => formatToMediumDate(params.value),
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
                editable: true,
            },
            {
                field: 'status',
                headerName: 'Status',
                cellRenderer: 'statusCellRenderer',
                editable: true,
                cellEditor: 'agSelectCellEditor',
                cellEditorParams: {
                    values: ['Active', 'Inactive'],
                },
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                filter: 'agDateColumnFilter',
                valueFormatter: (params) => formatToMedium(params.value)
            },
        ];
    }

    onAddButtonClicked() {
        if (this.rowData.some(x => x.isNew)) {
            return;
        }
        const newRow = {
            id: '',
            name: null,
            createdAt: new Date().toISOString(),
            status: 'Active',
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
                    this._userService.deleteUser(data.id).subscribe(() => {
                        this.gridApi.applyTransaction({ remove: [data] });
                        this.rowData.shift();
                    });
                }
            }
        })
    }

    onCellValueChanged(data) {
        if (!data.isNew) {
            this._userService.updateUser(data.id, data).subscribe();
        }
    }

    onSaveButtonClicked(data) {
        this._userService.createUser(data).subscribe();
    }
}
