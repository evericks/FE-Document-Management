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
import { formatToMedium, formatToMediumDate } from 'app/utils/datetime.utils';
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

    gridOptions: GridOptions = {
        ...globalGridOptions,
        onGridReady: (params) => {
            this.gridApi = params.api
        }
    }

    colDefs: ColDef[] = [
        {
            headerName: 'Actions',
            field: 'actions',
            cellRenderer: 'actionCellRenderer',
            sortable: false,
            filter: false,
            cellClass: () => {
                return 'flex justify-center item-center';
            },
            cellRendererParams: {
                onRemove: this.onRemoveButtonClicked.bind(this),
                onSave: this.onSaveButtonClicked.bind(this),
                showUpdateIcon: false
            },
        },
        {
            field: 'username',
            headerName: 'Username',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'name',
            headerName: 'Name',
            filter: 'agTextColumnFilter',
            onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            editable: true,
        },
        {
            field: 'gender',
            headerName: 'Gender',
            filter: 'agTextColumnFilter',
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
            valueFormatter: (params) => formatToMediumDate(params.value),
            onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            editable: true,
        },
        {
            field: 'status',
            headerName: 'Status',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'createdAt',
            headerName: 'Created At',
            valueFormatter: (params) => formatToMedium(params.value)
        },
    ];

    constructor(
        private _userService: UserService,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this._userService.users$.subscribe(users => {
            this.rowData = users;
        });

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
            name: '',
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
                    this._userService.deleteUser(data.id).subscribe(() => {
                        this.gridApi.applyTransaction({ remove: [data] });
                        this.rowData.shift();
                    });
                }
            }
        })
    }

    onCellValueChanged(data) {
        this._userService.updateUser(data.id, data).subscribe();
    }

    onSaveButtonClicked(data) {
        this._userService.createUser(data).subscribe();
    }
}
