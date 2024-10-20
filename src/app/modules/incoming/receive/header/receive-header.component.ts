import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi, GridOptions } from 'ag-grid-community';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';
import { ReceiveDocumentService } from '../receive.service';
import { Document } from 'app/types/document.type';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DocumentType } from 'app/types/document-type.type';
import { DocumentStatus } from 'app/types/document-status.type';
import { getItemNameById } from 'app/utils/common.utils';
import { User } from 'app/types/user.type';
import { formatToMedium, formatToMediumDate } from 'app/utils/datetime.utils';
import { UserService } from 'app/modules/setting/user/user.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DocumentStatusService } from 'app/modules/setting/document-status/document-status.service';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';

@Component({
    selector: 'receive-header',
    templateUrl: './receive-header.component.html',
    standalone: true,
    imports: [AgGridAngular, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule,
        MatIconModule, MatButtonModule, RouterModule]
})
export class ReceiveHeaderComponent implements OnInit {

    rowData: Document[] = [];

    private gridApi: GridApi;
    quickFilter: FormControl = new FormControl(null);
    documentTypes: DocumentType[] = [];
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
        private _receiveDocumentService: ReceiveDocumentService,
        private _userService: UserService,
        private _documentStatusService: DocumentStatusService,
        private _documentTypeService: DocumentTypeService,
        private _fuseConfirmationService: FuseConfirmationService
    ) { }

    ngOnInit(): void {
        this._receiveDocumentService.receiveDocuments$.subscribe(documents => {
            this.rowData = documents;
        });

        this._userService.users$.subscribe(users => {
            this.users = users;
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
                        showRemoveIcon: false
                    };
                }
            },
            {
                field: 'code',
                headerName: 'Document Number',
                filter: 'agTextColumnFilter',
            },
            {
                field: 'name',
                headerName: 'Title',
                maxWidth: 300,
                filter: 'agTextColumnFilter',
            },
            {
                field: 'issuingAgency',
                headerName: 'Issuing Agency',
                filter: 'agTextColumnFilter',
            },
            {
                field: 'senderId',
                headerName: 'Sender',
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
                headerName: 'Receiver',
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
                headerName: 'Due Date',
                filter: 'agDateColumnFilter',
                cellEditor: 'agDateCellEditor',
                cellDataType: 'date',
                cellRenderer: 'dueDateCellRenderer',
                valueFormatter: (params) => formatToMediumDate(params.value),
                onCellValueChanged: (params) => this.onCellValueChanged(params.data),
            },
            {
                field: 'documentTypeId',
                headerName: 'Type',
                cellEditor: 'autocompleteCellEditorRenderer',
                filterValueGetter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId),
                cellEditorParams: {
                    options: this.documentTypes,
                    required: true,
                },
                valueGetter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId),
                valueFormatter: (params) => getItemNameById(this.documentTypes, params.data?.documentTypeId),
                onCellValueChanged: (params) => {
                    this.onCellValueChanged(params.data);
                },
            },
            {
                field: 'statusId',
                headerName: 'Status',
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
            },
            {
                field: 'isInternal',
                headerName: 'Is Internal',
            },
            {
                field: 'isArchived',
                headerName: 'Is Archived',
            },
            {
                field: 'createdAt',
                headerName: 'Created At',
                valueFormatter: (params) => formatToMedium(params.value)
            },
        ];
    };

    onCellValueChanged(data) {
        if (!data.isNew) {
            this._receiveDocumentService.updateDocument(data.id, data).subscribe();
        }
    };

    onAddButtonClicked() {

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
                    this._receiveDocumentService.deleteDocument(data.id).subscribe(() => {
                        this.gridApi.applyTransaction({ remove: [data] });
                        this.rowData.shift();
                    });
                }
            }
        })
    }
}
