import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
    selector: 'star-cell',
    templateUrl: 'star-cell.component.html',
    standalone: true,
    imports: [CommonModule, MatIconModule]
})
export class StarCellRendererComponent implements ICellRendererAngularComp {
    isFilled: boolean = false;

    agInit(params: any): void {
        this.isFilled = params.value;
    }

    refresh(params: any): boolean {
        this.isFilled = params.value;
        return true;
    }
}
