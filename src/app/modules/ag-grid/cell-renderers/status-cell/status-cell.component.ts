import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'status-cell-renderer',
    templateUrl: 'status-cell.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class StatusCellRendererComponent implements ICellRendererAngularComp {
    public status: string;
    public statusClass: string;

    agInit(params: any): void {
        this.status = params.value;
        this.setStatusColor();
    }

    refresh(params: any): boolean {
        this.status = params.value;
        this.setStatusColor();
        return true;
    }

    private setStatusColor(): void {
        switch (this.status) {
            case 'Active':
                this.statusClass = 'border rounded-full text-green-500 border-green-500';
                break;
            case 'Inactive':
                this.statusClass = 'border rounded-full text-red-500 border-red-500';
                break;
            case 'Pending Classification':
                this.statusClass = 'border rounded-full text-yellow-600 border-yellow-600'; // Vàng đậm
                break;
            case 'Pending Approval':
                this.statusClass = 'border rounded-full text-yellow-500 border-yellow-500'; // Vàng
                break;
            case 'Classified':
                this.statusClass = 'border rounded-full text-green-500 border-green-500'; // Xanh lá
                break;
            case 'Cancelled':
                this.statusClass = 'border rounded-full text-red-500 border-red-500'; // Đỏ
                break;
            case 'Received':
                this.statusClass = 'border rounded-full text-blue-500 border-blue-500'; // Xanh dương
                break;
            case 'Archived':
                this.statusClass = 'border rounded-full text-gray-500 border-gray-500'; // Xám
                break;
            case 'Awaiting Feedback':
                this.statusClass = 'border rounded-full text-orange-500 border-orange-500'; // Cam
                break;
            case 'Distributed':
                this.statusClass = 'border rounded-full text-blue-400 border-blue-400'; // Xanh dương nhạt
                break;
            case 'Pending Reception':
                this.statusClass = 'border rounded-full text-pink-400 border-pink-400'; // Hồng nhạt
                break;
            case 'In Process':
                this.statusClass = 'border rounded-full text-indigo-500 border-indigo-500'; // Xanh chàm
                break;
            case 'Pending Archival':
                this.statusClass = 'border rounded-full text-pink-600 border-pink-600'; // Hồng đậm
                break;
            case 'Pending Issuance':
                this.statusClass = 'border rounded-full text-purple-500 border-purple-500'; // Tím
                break;
            case 'Transferred':
                this.statusClass = 'border rounded-full text-purple-600 border-purple-600'; // Tím đậm
                break;
            case 'Overdue':
                this.statusClass = 'border rounded-full text-red-600 border-red-600'; // Đỏ đậm
                break;
            case 'Pending Drafting':
                this.statusClass = 'border rounded-full text-pink-500 border-pink-500'; // Hồng
                break;
            case 'Pending Revision':
                this.statusClass = 'border rounded-full text-pink-700 border-pink-700'; // Hồng đậm hơn
                break;
            case 'Closed':
                this.statusClass = 'border rounded-full text-black border-black'; // Đen
                break;
            case 'In Drafting':
                this.statusClass = 'border rounded-full text-gray-700 border-gray-700'; // Xám đậm
                break;
            case 'Awaiting Response':
                this.statusClass = 'border rounded-full text-orange-400 border-orange-400'; // Cam nhạt
                break;
            case 'Responded':
                this.statusClass = 'border rounded-full text-teal-500 border-teal-500'; // Xanh teal
                break;
            case 'Issued':
                this.statusClass = 'border rounded-full text-teal-600 border-teal-600'; // Xanh teal đậm
                break;
            case 'Pending Distribution':
                this.statusClass = 'border rounded-full text-yellow-400 border-yellow-400'; // Vàng nhạt
                break;
            case 'Approved':
                this.statusClass = 'border rounded-full text-green-600 border-green-600'; // Xanh lá đậm
                break;
            case 'Processed':
                this.statusClass = 'border rounded-full text-green-400 border-green-400'; // Xanh lá nhạt
                break;
            default:
                this.statusClass = 'border rounded-full text-gray-500 border-gray-500';
        }
    }
}