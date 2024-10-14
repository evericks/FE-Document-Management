import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'user',
    templateUrl: './user.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class UserComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
