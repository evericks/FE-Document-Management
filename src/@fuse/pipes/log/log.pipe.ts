import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'log'
})
export class LogPipe implements PipeTransform {

    transform(value: string): string {

        switch (value) {
            case 'Receive':
                return 'Tiếp nhận';
            case 'Classify':
                return 'Phân loại';
            case 'Return':
                return 'Trả lại';
            case 'Send':
                return 'Chuyển đi';
            case 'Create Outgoing':
                return 'Tạo mới văn bản đi';
            case 'Create Incoming':
                return 'Tạo mới văn bản đến';
            case 'Update':
                return 'Cập nhật';
            default:
                return 'Chưa xác định';
        }
    }
}