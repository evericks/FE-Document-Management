import { DatePipe } from '@angular/common';

export function formatToMedium(dateString: any): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, 'medium');
}

export function formatToFullDate(dateString: any): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, 'fullDate');
}

export function formatToShortDate(dateString: any): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, 'shortDate');
}

export function formatToMediumDate(dateString: any): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(dateString, 'mediumDate');
}
