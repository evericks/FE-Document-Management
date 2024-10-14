import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'role',
    templateUrl: './role.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class RoleComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
