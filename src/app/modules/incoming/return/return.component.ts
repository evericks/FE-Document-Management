import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'return',
    templateUrl: './return.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ReturnComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
