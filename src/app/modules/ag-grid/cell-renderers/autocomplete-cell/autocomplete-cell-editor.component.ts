import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ICellEditorAngularComp } from 'ag-grid-angular';
import { map, Observable, startWith } from 'rxjs';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { AbstractControl, ValidatorFn } from '@angular/forms';

@Component({
    selector: 'autocomplete-cell-editor',
    templateUrl: './autocomplete-cell-editor.component.html',
    standalone: true,
    imports: [CommonModule, MatAutocompleteModule, MatFormFieldModule, FormsModule, ReactiveFormsModule, MatInputModule],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {
                subscriptSizing: 'dynamic'
            }
        }
    ],
})
export class AutocompleteCellEditorComponent implements ICellEditorAngularComp, OnInit, AfterViewInit {
    @ViewChild('inputElement') inputElement: ElementRef;
    placeholder: string = 'Search';
    itemControl = new FormControl();
    filteredItems: Observable<any[]>;
    items: any[] = [];

    ngOnInit() {
        this.filteredItems = this.itemControl.valueChanges.pipe(
            startWith(''),
            map(value => this._filter(value || ''))
        );
    }

    ngAfterViewInit() {
        this.inputElement.nativeElement.focus();
    }

    agInit(params: any): void {
        this.items = params.options;

        if (params.required) {
            this.itemControl.setValidators([Validators.required, this.itemExistsValidator(this.items)]);
        } else {
            this.itemControl.setValidators(this.itemExistsValidator(this.items));
        }

        this.itemControl.updateValueAndValidity(); // Cập nhật giá trị và tính hợp lệ

        if (params.placeholder) {
            this.placeholder = params.placeholder;
        }

        // Lấy dữ liệu từ params.options
        const selectedItem = this.items.find(item => item.id === params.value);
        if (selectedItem) {
            // Hiển thị tên thay vì id
            this.itemControl.setValue(selectedItem.name);
        }
    }


    getValue(): any {
        const selected = this.items.find(item => item.name === this.itemControl.value);
        return selected ? selected.id : null;
    }

    isCancelAfterEnd(): boolean {
        return this.itemControl.invalid;
    }

    private _filter(value: string): any[] {
        const filterValue = value.toLowerCase();
        return this.items.filter(option => option.name.toLowerCase().includes(filterValue));
    }

    onSelect(event: any): void {
        this.itemControl.setValue(event.option.viewValue);
    }

    private itemExistsValidator(items: any[]): ValidatorFn {
        return (control: AbstractControl): { [key: string]: any } | null => {
            const isValid = items.some(item => item.name === control.value);
            return isValid ? null : { itemNotFound: { value: control.value } };
        };
    }
}
