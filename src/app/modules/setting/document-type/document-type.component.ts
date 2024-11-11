import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'document-type',
    templateUrl: './document-type.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class DocumentTypeComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
