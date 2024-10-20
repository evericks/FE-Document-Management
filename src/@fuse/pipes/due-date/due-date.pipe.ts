import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon'; // Sử dụng Luxon để làm việc với ngày tháng dễ dàng hơn

@Pipe({
    name: 'dueDate'
})
export class DueDatePipe implements PipeTransform {

    transform(value: string): string {
        // Parse string date truyền vào (giả sử định dạng là yyyy-MM-dd)
        const dueDate = DateTime.fromISO(value);
        const today = DateTime.now();

        // Tính toán số ngày còn lại
        const daysDifference = dueDate.diff(today, 'days').days;

        // Logic kiểm tra và trả về màu tương ứng
        if (daysDifference < 0) {
            return 'text-red';  // Ngày đã quá hạn
        } else if (daysDifference <= 3) {
            return 'text-orange';  // Còn lại ít hơn hoặc bằng 3 ngày trước hạn
        } else {
            return 'text-green';  // Ngày chưa quá hạn
        }
    }
}
