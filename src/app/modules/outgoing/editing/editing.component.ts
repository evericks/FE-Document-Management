import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'editing',
    templateUrl: './editing.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class EditingComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
