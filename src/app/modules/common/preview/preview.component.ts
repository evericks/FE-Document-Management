import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { NgxDocViewerModule } from 'ngx-doc-viewer';

@Component({
    selector: 'preview',
    templateUrl: './preview.component.html',
    standalone: true,
    imports: [CommonModule, MatButtonModule, MatIconModule, NgxDocViewerModule]
})
export class PreviewComponent implements OnInit, AfterViewInit {
    @ViewChild('docViewer', { static: false }) docViewer: ElementRef | null = null;
    fileReady: boolean = false;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public matDialogRef: MatDialogRef<PreviewComponent>,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {

    }
}
