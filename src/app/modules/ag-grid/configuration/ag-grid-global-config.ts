import { GridOptions } from "ag-grid-community";
import { ActionCellComponent } from "../cell-renderers/action-cell/action-cell.component";
import { StatusCellRendererComponent } from "../cell-renderers/status-cell/status-cell.component";
import { AutocompleteCellEditorComponent } from "../cell-renderers/autocomplete-cell/autocomplete-cell-editor.component";
import { DueDateCellRendererComponent } from "../cell-renderers/due-date-cell/due-date-cell.component";

export const defaultColDef = {
    flex: 1,
    enableValue: true,
    resizable: true,
    sortable: true,
    enableCellChangeFlash: true,
    enableRowGroup: true,
    enablePivot: true,
    minWidth: 200,
    filter: true,
    suppressAutoSize: true,
    tooltipComponent: 'customTooltip',
};

export const globalGridOptions: GridOptions = {
    rowModelType: 'clientSide',
    pagination: true,
    paginationPageSize: 20,
    paginationPageSizeSelector: [5, 10, 20, 50, 100, 200, 500, 1000],
    animateRows: true,
    tooltipShowDelay: 1000,
    defaultColDef: defaultColDef,
    components: {
        actionCellRenderer: ActionCellComponent,
        statusCellRenderer: StatusCellRendererComponent,
        autocompleteCellEditorRenderer: AutocompleteCellEditorComponent,
        dueDateCellRenderer: DueDateCellRendererComponent
    },
    getRowId: (params) => params.data.id
};