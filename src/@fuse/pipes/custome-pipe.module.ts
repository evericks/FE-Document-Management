import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DueDatePipe } from './due-date/due-date.pipe';
import { StatusPipe } from './status/status.pipe';

@NgModule({
    declarations: [
        DueDatePipe, StatusPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DueDatePipe, StatusPipe
    ]
})
export class CustomPipesModule { }
