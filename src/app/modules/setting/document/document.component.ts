import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'document',
    templateUrl: './document.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class DocumentComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
