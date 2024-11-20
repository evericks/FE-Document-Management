import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'tracking',
    templateUrl: './tracking.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class TrackingComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
