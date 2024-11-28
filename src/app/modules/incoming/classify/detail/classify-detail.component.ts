import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
import { DocumentType } from 'app/types/document-type.type';
import { Document } from 'app/types/document.type';
import { Observable } from 'rxjs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSelectModule } from '@angular/material/select';


@Component({
    selector: 'classify-detail',
    templateUrl: './classify-detail.component.html',
    standalone: true,
    imports: [CommonModule, CustomPipesModule, MatButtonModule,
        MatStepperModule, FormsModule, ReactiveFormsModule, MatFormFieldModule,
        MatInputModule, MatIconModule, MatSlideToggleModule, MatSelectModule]
})
export class ClassifyDetailComponent implements OnInit {

    document$: Observable<Document>;
    documentTypes: DocumentType[];
    processSteps: any[] = [];
    documentProcesses: any[] = [];
    additionalInformations: any[] = [];
    selectedIndex: number;
    isLinear = false;
    additionalInformationForm: FormGroup;

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
        this._documentTypeService.documentTypes$.subscribe(documentTypes => {
            this.documentTypes = documentTypes;
        })
        this.document$.subscribe(document => {
            if (document.documentType) {
                if (this.processSteps = document.documentType.process) {
                    this.processSteps = document.documentType.process.processSteps
                    this.selectedIndex = this.getHighestCompletedStepIndex(this.processSteps, this.documentProcesses);
                }
                this.documentProcesses = document.documentProcesses;
            }
        });
        this.additionalInformationForm = this._formBuilder.group({
            documentTypeId: [null, [Validators.required]],
            isImportant: [false, [Validators.required]],
            isInternal: [true, [Validators.required]],
            isArchived: [false, [Validators.required]],
            additionalInformations: this._formBuilder.array([]),
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

    get properties(): FormArray {
        return this.additionalInformationForm.get('additionalInformations') as FormArray;
    }

    onDocumentTypeChanged(event: any) {
        this.additionalInformationForm.controls['documentTypeId'].setValue(event.value.id);
        this._documentTypeService.getAdditionalInformationById(event.value.id).subscribe(
            (adis) => {
                if (adis && adis.length > 0) {
                    this.properties.clear();
                    adis.forEach((element) => {
                        const propertyGroup = this._formBuilder.group({
                            key: [element.id, Validators.required],
                            label: [element.description, Validators.required],
                            value: [null, Validators.required],
                        });
                        this.properties.push(propertyGroup);
                    });
                }
                this.additionalInformations = adis || [];
            }
        );
    }

    submit(id: string) {
        this._fuseConfirmationService.open({
            title: 'Xác nhận',
            message: 'Bạn chắc chắn muốn phân loại văn bản này',
            icon: {
                color: 'info',
            },
            actions: {
                cancel: {
                    label: 'Hủy'
                },
                confirm: {
                    color: 'primary',
                    label: 'Xác Nhận'
                }
            }
        }).afterClosed().subscribe(result => {
            if (result === 'confirmed') {
                if (this.additionalInformationForm.valid) {
                    this._documentService.classifyDocument(id, this.additionalInformationForm.value).subscribe(() => {
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
                    })
                }
            }
        });
    }

    goBack() {
        this._router.navigate(['/incoming-documents/classify']);
    }
}
