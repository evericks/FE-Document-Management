import { Component, OnInit } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { globalGridOptions } from 'app/modules/ag-grid/configuration/ag-grid-global-config';

@Component({
    selector: 'receive-header',
    templateUrl: './receive-header.component.html',
    standalone: true,
    imports: [AgGridAngular]
})
export class ReceiveHeaderComponent implements OnInit {

    gridOptions: GridOptions = {
        ...globalGridOptions
    }

    colDefs: ColDef[] = [
        {
            field: 'documentNumber',
            headerName: 'Document Number',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'title',
            headerName: 'Title',
            filter: 'agTextColumnFilter',
            editable: true,
        },
        {
            field: 'senderId',
            headerName: 'Sender',
            filter: 'agTextColumnFilter',
        },
        {
            field: 'receiveDate',
            headerName: 'Receive Date',
        },
        {
            field: 'categoryId',
            headerName: 'Category',
        },
        {
            field: 'statusId',
            headerName: 'Status',
        },
        {
            field: 'documentProcessingDeadline',
            headerName: 'Document Processing Deadline',
        },
        {
            field: 'userInCharge',
            headerName: 'User In Charge',
        },
        {
            field: 'departmentInCharge',
            headerName: 'Department In Charge',
        },
    ];

    rowData = [
        { id: '1', documentNumber: "DOC-0001", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '2', documentNumber: "DOC-0002", title: "Đơn Xin Nghỉ Việc", senderId: 'qweqw-22-3-qwe-qw-aaa' },
        { id: '3', documentNumber: "DOC-0003", title: "Công Văn Chính Phủ", senderId: 'qweqw-22-3-qwe-qw-aaa' },
        { id: '4', documentNumber: "DOC-0004", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '5', documentNumber: "DOC-0005", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '6', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '7', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '8', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '9', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '10', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '11', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '12', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '13', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '14', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '15', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '16', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '17', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '18', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '19', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
        { id: '20', documentNumber: "DOC-0006", title: "Công Văn Chính Phủ", senderId: 'qweqw-12-3-qwe-qw-aaa' },
    ];

    constructor() { }

    ngOnInit(): void { }
}
