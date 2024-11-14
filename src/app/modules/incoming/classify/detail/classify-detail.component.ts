import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatStepperModule } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { CustomPipesModule } from '@fuse/pipes/custome-pipe.module';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { DocumentTypeCardComponent } from 'app/modules/common/document-type-card/document-type-card.component';
import { DocumentTypeService } from 'app/modules/setting/document-type/document-type.service';
import { DocumentService } from 'app/modules/setting/document/document.service';
import { Document } from 'app/types/document.type';
import { Observable } from 'rxjs';


@Component({
    selector: 'classify-detail',
    templateUrl: './classify-detail.component.html',
    standalone: true,
    imports: [CommonModule, CustomPipesModule, MatButtonModule,
        MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatIconModule]
})
export class ClassifyDetailComponent implements OnInit {

    document$: Observable<Document>;
    processSteps: any[] = [];
    documentProcesses: any[] = [];
    selectedIndex: number;
    isLinear = false;

    constructor(
        private _documentService: DocumentService,
        private _formBuilder: FormBuilder,
        private _matDialog: MatDialog,
        private _documentTypeService: DocumentTypeService,
        private _fuseConfirmationService: FuseConfirmationService,
        private _router: Router
    ) { }

    ngOnInit(): void {
        this.document$ = this._documentService.document$;
        this.document$.subscribe(document => {
            if (document.documentType) {
                if (this.processSteps = document.documentType.process) {
                    this.processSteps = document.documentType.process.processSteps
                    this.selectedIndex = this.getHighestCompletedStepIndex(this.processSteps, this.documentProcesses);
                }
                this.documentProcesses = document.documentProcesses;
            }
        });
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

    classifyButtonClicked(id: string) {
        this._documentTypeService.getDocumentTypes().subscribe(() => {
            this._matDialog.open(DocumentTypeCardComponent, {
                width: '720px',
                height: '500px'
            }).afterClosed().subscribe(data => {
                if (data) {
                    this._documentService.classifyDocument(id, data.id).subscribe(() => {
                        this._fuseConfirmationService.open({
                            title: 'Thành công',
                            message: 'Văn bản đã được phân loại',
                            icon: {
                                color: 'success',
                                name: 'heroicons_outline:shield-check'
                            },
                            actions: {
                                cancel: {
                                    show: false
                                },
                                confirm: {
                                    color: 'primary',
                                    label: 'Tiếp Tục'
                                }
                            }
                        }).afterClosed().subscribe(() => {
                            this.goBack()
                        });
                    });
                }

            });
        });
    }

    goBack() {
        this._router.navigate(['/incoming-documents/classify']);
    }
}
