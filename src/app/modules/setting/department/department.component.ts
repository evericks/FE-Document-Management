import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'department',
    templateUrl: './department.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class DepartmentComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
