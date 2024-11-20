import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DueDatePipe } from './due-date/due-date.pipe';
import { StatusPipe } from './status/status.pipe';
import { LogPipe } from './log/log.pipe';

@NgModule({
    declarations: [
        DueDatePipe, StatusPipe, LogPipe
    ],
    imports: [
        CommonModule
    ],
    exports: [
        DueDatePipe, StatusPipe, LogPipe
    ]
})
export class CustomPipesModule { }
