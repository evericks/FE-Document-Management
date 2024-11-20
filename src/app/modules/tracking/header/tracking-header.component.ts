import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { CustomPipesModule } from '@fuse/pipes/custome-pipe.module';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { OrganizationService } from 'app/modules/setting/organization/organization.service';
import { UserService } from 'app/modules/setting/user/user.service';
import { DocumentStatus } from 'app/types/document-status.type';
import { DocumentType } from 'app/types/document-type.type';
import { Document } from 'app/types/document.type';
import { Organization } from 'app/types/organization.type';
import { User } from 'app/types/user.type';
import { getItemNameById } from 'app/utils/common.utils';
import { formatToMedium, formatToMediumDate } from 'app/utils/datetime.utils';

@Component({
    selector: 'tracking-header',
    templateUrl: './tracking-header.component.html',
    standalone: true,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule, CustomPipesModule]
})
export class TrackingHeaderComponent implements OnInit {

    rowData: Document[] = [];

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    documentTypes: DocumentType[] = [];
    organizations: Organization[] = [];
    documentStatuses: DocumentStatus[] = [];
    users: User[] = [];
    colDefs: ColDef[] = [];

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

    constructor(
        private _documentService: DocumentService,
        private _userService: UserService,
        private _organizationService: OrganizationService,
        private _documentStatusService: DocumentStatusService,
        private _documentTypeService: DocumentTypeService,
        private _router: Router,
    ) { }

    ngOnInit(): void {
        this._documentService.documents$.subscribe(documents => {
            this.rowData = documents;
        });

        this._userService.users$.subscribe(users => {
            this.users = users;
        });

        this._organizationService.organizations$.subscribe(organizations => {
            this.organizations = organizations;
        });

        this._documentStatusService.documentStatuses$.subscribe(documentStatuses => {
            this.documentStatuses = documentStatuses;
        });

        this._documentTypeService.documentTypes$.subscribe(documentTypes => {
            this.documentTypes = documentTypes;
        });

        this.initColDefs();

        this.quickFilter.valueChanges.subscribe(value => {
            this.gridApi.setGridOption('quickFilterText', value);
        });
    };

    initColDefs() {
        this.colDefs = [
            {
                headerName: 'Công Cụ',
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
                        onEdit: this.onEditButtonClicked.bind(this),
                        showRemoveIcon: false
                    };
                }
            },
            {
                field: 'isImportant',
                headerName: 'Văn Bản Quan Trọng',
                cellRenderer: 'starCellRenderer',
            },
            {
                field: 'code',
                headerName: 'Mã Văn Bản',
                filter: 'agTextColumnFilter',
            },
            {
                field: 'name',
                headerName: 'Tên Văn Bản',
                maxWidth: 300,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'organizationId',
                headerName: 'Cơ Quan Ban Hành',
                valueGetter: (params) => getItemNameById(this.organizations, params.data?.organizationId),
            },
            {
                field: 'senderId',
                headerName: 'Người Gửi',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.users, params.data?.senderId),
                cellEditorParams: {
                    options: this.users,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.users, params.data?.senderId),
                valueFormatter: (params) => getItemNameById(this.users, params.data?.senderId),
            },
            {
                field: 'receiverId',
                headerName: 'Người Nhận',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.users, params.data?.receiverId),
                cellEditorParams: {
                    options: this.users,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.users, params.data?.receiverId),
                valueFormatter: (params) => getItemNameById(this.users, params.data?.receiverId),
            },
            {
                field: 'dueDate',
                headerName: 'Hạn Xử Lý',
                filter: 'agDateColumnFilter',
                cellEditor: 'agDateCellEditor',
                cellDataType: 'date',
                cellRenderer: 'dueDateCellRenderer',
                valueFormatter: (params) => formatToMediumDate(params.value),
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            },
            {
                field: 'documentTypeId',
                headerName: 'Loại Văn Bản',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId) ?? 'Chưa Phân Loại',
                cellEditorParams: {
                    options: this.documentTypes,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId) ?? 'Chưa Phân Loại',
                valueFormatter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId) ?? 'Chưa Phân Loại',
                onCellValueChanged: (params) => {
                    this.onCellValueChanged(params.data);
                },
            },
            {
                field: 'statusId',
                headerName: 'Trạng Thái',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.documentStatuses, params.data?.statusId),
                cellEditorParams: {
                    options: this.documentStatuses,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.documentStatuses, params.data?.statusId),
                valueFormatter: (params) => getItemNameById(this.documentStatuses, params.data?.statusId),
                onCellValueChanged: (params) => {
                    this.onCellValueChanged(params.data);
                },
                cellRenderer: 'statusCellRenderer',
            },
            {
                headerName: 'Văn Bản Nội Bộ',
                field: 'isInternal',
            },
            {
                headerName: 'Đã Lưu Trữ',
                field: 'isArchived',
            },
            {
                headerName: 'Ngày Tạo',
                field: 'createdAt',
                filter: 'agDateColumnFilter',
                valueFormatter: (params) => formatToMedium(params.value)
            },
        ];
    };

    onCellValueChanged(data) {
        if (!data.isNew) {
            this._documentService.updateDocument(data.id, data).subscribe();
        }
    };

    onEditButtonClicked(data) {
        this._router.navigate(['/incoming-documents/tracking', data.id]);
    }
}
