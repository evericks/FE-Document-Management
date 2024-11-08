import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'classify',
    templateUrl: './classify.component.html',
    standalone: true,
    imports: [RouterModule]
})
export class ClassifyComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
