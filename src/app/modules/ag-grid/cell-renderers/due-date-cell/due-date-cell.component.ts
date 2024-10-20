import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { formatToMediumDate } from 'app/utils/datetime.utils';
import { DateTime } from 'luxon'; // Sử dụng Luxon để tính toán ngày

@Component({
    selector: 'due-date-cell',
    templateUrl: 'due-date-cell.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class DueDateCellRendererComponent implements ICellRendererAngularComp {
    public dueDate: string;
    public dueDateClass: string;
    public dueDateFormated: string;

    agInit(params: any): void {
        this.dueDate = params.value;
        this.dueDateFormated = formatToMediumDate(this.dueDate);
        this.setDueDateColor();
    }

    refresh(params: any): boolean {
        this.dueDate = params.value;
        this.setDueDateColor();
        return true;
    }

    private setDueDateColor(): void {
        const today = DateTime.now();
        const dueDate = DateTime.fromISO(this.dueDate); // Giả sử ngày truyền vào là dạng yyyy-MM-dd
        const daysDifference = dueDate.diff(today, 'days').days;

        // Thiết lập màu sắc dựa trên số ngày còn lại
        if (daysDifference < 0) {
            this.dueDateClass = 'border rounded-full text-red-500 border-red-500'; // Quá hạn
        } else if (daysDifference <= 3) {
            this.dueDateClass = 'border rounded-full text-orange-500 border-orange-500'; // Còn ít hơn hoặc bằng 3 ngày
        } else {
            this.dueDateClass = 'border rounded-full text-green-500 border-green-500'; // Chưa quá hạn
        }
    }
}
