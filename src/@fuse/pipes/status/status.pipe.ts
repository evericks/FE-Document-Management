import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon'; // Sử dụng Luxon để làm việc với ngày tháng dễ dàng hơn

@Pipe({
    name: 'status'
})
export class StatusPipe implements PipeTransform {

    transform(value: string): string {

        switch (value) {
            case 'Active':
                return 'border rounded-full text-green-500 border-green-500';
            case 'Inactive':
                return 'border rounded-full text-red-500 border-red-500';
            case 'Pending Classification':
                return 'border rounded-full text-yellow-600 border-yellow-600'; // Vàng đậm
            case 'Pending Approval':
                return 'border rounded-full text-yellow-500 border-yellow-500'; // Vàng
            case 'Classified':
                return 'border rounded-full text-green-500 border-green-500'; // Xanh lá
            case 'Cancelled':
                return 'border rounded-full text-red-500 border-red-500'; // Đỏ
            case 'Received':
                return 'border rounded-full text-blue-500 border-blue-500'; // Xanh dương
            case 'Archived':
                return 'border rounded-full text-gray-500 border-gray-500'; // Xám
            case 'Awaiting Feedback':
                return 'border rounded-full text-orange-500 border-orange-500'; // Cam
            case 'Distributed':
                return 'border rounded-full text-blue-400 border-blue-400'; // Xanh dương nhạt
            case 'Pending Reception':
                return 'border rounded-full text-pink-400 border-pink-400'; // Hồng nhạt
            case 'In Process':
                return 'border rounded-full text-indigo-500 border-indigo-500'; // Xanh chàm
            case 'Pending Archival':
                return 'border rounded-full text-pink-600 border-pink-600'; // Hồng đậm
            case 'Pending Issuance':
                return 'border rounded-full text-purple-500 border-purple-500'; // Tím
            case 'Transferred':
                return 'border rounded-full text-purple-600 border-purple-600'; // Tím đậm
            case 'Overdue':
                return 'border rounded-full text-red-600 border-red-600'; // Đỏ đậm
            case 'Pending Drafting':
                return 'border rounded-full text-pink-500 border-pink-500'; // Hồng
            case 'Pending Revision':
                return 'border rounded-full text-pink-700 border-pink-700'; // Hồng đậm hơn
            case 'Closed':
                return 'border rounded-full text-black border-black'; // Đen
            case 'In Drafting':
                return 'border rounded-full text-gray-700 border-gray-700'; // Xám đậm
            case 'Awaiting Response':
                return 'border rounded-full text-orange-400 border-orange-400'; // Cam nhạt
            case 'Responded':
                return 'border rounded-full text-teal-500 border-teal-500'; // Xanh teal
            case 'Issued':
                return 'border rounded-full text-teal-600 border-teal-600'; // Xanh teal đậm
            case 'Pending Distribution':
                return 'border rounded-full text-yellow-400 border-yellow-400'; // Vàng nhạt
            case 'Approved':
                return 'border rounded-full text-green-600 border-green-600'; // Xanh lá đậm
            case 'Processed':
                return 'border rounded-full text-green-400 border-green-400'; // Xanh lá nhạt
            default:
                return 'border rounded-full text-gray-500 border-gray-500';
        }
    }
}