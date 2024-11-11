import { GridOptions } from "ag-grid-community";
import { ActionCellComponent } from "../cell-renderers/action-cell/action-cell.component";
import { StatusCellRendererComponent } from "../cell-renderers/status-cell/status-cell.component";
import { AutocompleteCellEditorComponent } from "../cell-renderers/autocomplete-cell/autocomplete-cell-editor.component";
import { DueDateCellRendererComponent } from "../cell-renderers/due-date-cell/due-date-cell.component";
import { StarCellRendererComponent } from "../cell-renderers/star-cell/star-cell.component";
import { AG_GRID_LOCALE_VN } from '@ag-grid-community/locale';

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
    localeText: AG_GRID_LOCALE_VN,
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
        dueDateCellRenderer: DueDateCellRendererComponent,
        starCellRenderer: StarCellRendererComponent,
    },
    getRowId: (params) => params.data.id
};

export const masterDetailDefaultColDef = {
    flex: 1,
    minWidth: 200,
    enableValue: true,
    enableCellChangeFlash: true,
    filter: true,
    suppressAutoSize: true,
    tooltipComponent: 'customTooltip',
};
