import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { KanbanColumn } from '../interfaces';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { SelectionMap } from '~core/list-page';
import { KanbanService } from './kanban.service';
import { Entity } from '~core/models';


export interface SelectedColumn {
	column: KanbanColumn;
	state: SelectionState;
}

@Injectable()
export class KanbanSelectionService {
	selection: SelectionMap = new Map();
	private _selection$ = new BehaviorSubject<SelectionMap>(this.selection);
	selection$: Observable<SelectionMap>;
	selectedColumn: SelectedColumn;
	private _selectedColumn$ = new ReplaySubject<SelectedColumn>(1);
	selectedColumn$ = this._selectedColumn$.asObservable();

	constructor(private kanbanSrv: KanbanService) {
		// TODO check if subscription is removed when we change page
		this.kanbanSrv.columns$
			.subscribe(columns => this.checkSelection(columns));
	}


	selectAllFromColumn(column: KanbanColumn) {
		this.selectedColumn = { column, state: 'selectedAll' };
		this.selection = new Map(column.dataMap);
		this.emit();
	}

	// no need for param as we know which is the currently selected col
	unselectAllFromColumn() {
		this.selectedColumn = undefined;
		this.selection = new Map();
		this.emit();
	}

	selectOne(item: Entity, column: KanbanColumn) {
		if (this.selectedColumn.column.id !== column.id) {
			this.selection = new Map();
		}
		this.selection.set(item.id, item);
		const isAllSelected = column.data.length === this.selection.size;
		const state: SelectionState = isAllSelected ? 'selectedAll' : 'selectedPartial';
		this.selectedColumn = { column, state };
		this.emit();
	}

	unselectOne(item: Entity) {
		this.selection.delete(item.id);
		const isNoneSelected = this.selection.size === 0;
		if (isNoneSelected) {
			this.selectedColumn = undefined;
		} else {
			const column = this.selectedColumn.column;
			this.selectedColumn = { state: 'selectedPartial', column };
		}
		this.emit();
	}

	private checkSelection(columns: KanbanColumn[]) {
		if (!this.selectedColumn) {
			return;
		}

		const selectedColId = this.selectedColumn.column.id;
		const column = columns.find(col => col.id === selectedColId);
		// we cannot safely just check the length here,
		// in some cases (like someone else deletes an item and add another)
		// that would be incorrect.
		// But I think that bug would be so rare that we can just turn a blind eye
		const isApproxSame = column.data.length === this.selection.size;
		if (isApproxSame) {
			return;
		}


		// if there is more data now than before (adding an item),
		// then it's now only partially selected
		if (column.data.length > this.selection.size) {
			this.selectedColumn = { column, state: 'selectedPartial' };
			this.emit();
			return;
		}

		// if there is less data now than before then we gotta remove the missing
		// items from the selection
		Array.from(this.selection.keys()).forEach(id => {
			if (!column.dataMap.has(id)) {
				this.selection.delete(id);
			}
		});

	}

	private emit() {
		this._selectedColumn$.next(this.selectedColumn);
		this._selection$.next(this.selection);
	}
}
