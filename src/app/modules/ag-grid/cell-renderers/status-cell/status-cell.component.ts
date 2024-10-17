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
            default:
                this.statusClass = 'border rounded-full text-gray-500 border-gray-500';
        }
    }
}