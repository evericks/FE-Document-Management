import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'process-setting',
    templateUrl: './process-setting.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ProcessComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
