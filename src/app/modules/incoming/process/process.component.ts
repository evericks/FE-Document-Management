import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'process',
    templateUrl: './process.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ProcessComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
