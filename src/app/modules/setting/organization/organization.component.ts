import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'organization',
    templateUrl: './organization.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class OrganizationComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
