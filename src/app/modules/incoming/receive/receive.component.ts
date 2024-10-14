import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'receive',
    templateUrl: './receive.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ReceiveComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
