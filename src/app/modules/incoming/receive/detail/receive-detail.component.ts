import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { CustomPipesModule } from '@fuse/pipes/custome-pipe.module';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { Document } from 'app/types/document.type';
import { Observable } from 'rxjs';


@Component({
    selector: 'receive-detail',
    templateUrl: './receive-detail.component.html',
    standalone: true,
    //     styles: `
    //     :host ::ng-deep .mat-horizontal-content-container {
    //     padding:0 !important;
    // }`,
    imports: [CommonModule, CustomPipesModule, MatButtonModule,
        MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatIconModule]
})
export class ReceiveDetailComponent implements OnInit {

    document$: Observable<Document>;
    processSteps: any[] = [];
    documentProcesses: any[] = [];
    selectedIndex: number;
    isLinear = false;

    constructor(
        private _documentService: DocumentService,
        private _formBuilder: FormBuilder,
    ) { }

    ngOnInit(): void {
        this.document$ = this._documentService.document$;
        this.document$.subscribe(document => {
            if (document.documentType) {
                this.processSteps = document.documentType.processes[0].processSteps;
                this.documentProcesses = document.documentProcesses;
            }
        });
        this.selectedIndex = this.getHighestCompletedStepIndex(this.processSteps, this.documentProcesses);
    }

    firstFormGroup = this._formBuilder.group({
        firstCtrl: ['', Validators.required],
    });
    secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required],
    });

    isStepCompleted(stepId: string): boolean {
        return this.documentProcesses.some(step => step.processStep.id === stepId);
    }

    getHighestCompletedStepIndex(stepsList1: any[], stepsList2: any[]): number {
        // Lọc các step trong stepsList1 mà có stepNumber nằm trong stepsList2
        const completedSteps = stepsList1.filter(step1 =>
            stepsList2.some(step2 => step1.id === step2.processStep.id)
        );

        // Tìm stepNumber cao nhất
        const highestCompletedStep = Math.max(...completedSteps.map(step => step.stepNumber));

        // Trả về index của stepNumber cao nhất trong stepsList1
        return stepsList1.findIndex(step => step.stepNumber === highestCompletedStep);
    }

    getStepFromProcessSteps(stepId: string) {
        return this.documentProcesses.find(step => step.processStep.id === stepId) || null;
    }
}
