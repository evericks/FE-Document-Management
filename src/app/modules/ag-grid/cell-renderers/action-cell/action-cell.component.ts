import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { HotkeyService } from 'app/modules/hotkey/hotkey.service';

@Component({
    selector: 'action-cell',
    templateUrl: './action-cell.component.html',
    standalone: true,
    imports: [CommonModule, MatIcon]
})
export class ActionCellComponent implements ICellRendererAngularComp {
    private params: any;
    display: boolean = true;
    expanded: boolean = false;
    showUpdateIcon: boolean = true;
    showRemoveIcon: boolean = true;
    showExpandIcon: boolean = false;
    showSettingIcon: boolean = false;
    isNew: boolean = false;

    constructor(
        private _hotkeyService: HotkeyService,
    ) { }

    ngOnInit(): void {
    }

    // Phương thức ag-Grid gọi để khởi tạo component
    agInit(params: any): void {
        this.params = params;
        this.display = params.display ?? true;
        this.showExpandIcon = params.showExpandIcon ?? false;
        this.showSettingIcon = params.showSettingIcon ?? false;
        this.showUpdateIcon = params.showUpdateIcon ?? true;
        this.showRemoveIcon = params.showRemoveIcon ?? true;
        this.isNew = params.data?.isNew ?? false;

        if (this.params.data?.isNew) {
            this._hotkeyService.listenForCtrlEnter(this.onSave.bind(this));
        }
    }

    // Hàm xử lý sự kiện click Remove
    onRemove() {
        if (this.params.onRemove) {
            this.params.onRemove(this.params.data);
        }
    }

    // Hàm xử lý sự kiện click Setting
    onSetting() {
        if (this.params.onSetting) {
            this.params.onSetting(this.params.data);
        }
    }

    // Hàm xử lý sự kiện click Edit
    onEdit() {
        if (this.params.onEdit) {
            this.params.onEdit(this.params.data);
        }
    }

    // Save button event handler
    onSave() {
        if (this.params.onSave) {
            this.params.onSave(this.params.data);
        }
    }

    // Update button event handler
    onUpdate() {
        if (this.params.onUpdate) {
            this.params.onUpdate(this.params.data);
        }
    }

    toggleExpand() {
        if (this.expanded) {
            this.params.node.setExpanded(false); // Collapse the row
        } else {
            this.params.node.setExpanded(true); // Expand the row
        }
        this.expanded = !this.expanded;
    }

    refresh(params: any): boolean {
        this.params = params;
        this.display = params.display ?? true;
        this.showExpandIcon = params.showExpandIcon ?? false;
        this.showSettingIcon = params.showSettingIcon ?? false;
        this.showUpdateIcon = params.showUpdateIcon ?? true;
        this.showRemoveIcon = params.showRemoveIcon ?? true;
        return true;
    }
}
