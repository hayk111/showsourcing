import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
import { KanbanColumn } from '../interfaces';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { SelectionMap } from '~core/list-page';
import { KanbanService } from './kanban.service';
import { Entity } from '~core/orm/models';
import { map, tap } from 'rxjs/operators';


export interface SelectedColumn {
	column: KanbanColumn;
	state: SelectionState;
}

@Injectable()
export class KanbanSelectionService {
	selection: SelectionMap = new Map();
	private _selection$ = new BehaviorSubject<SelectionMap>(this.selection);
	selection$: Observable<SelectionMap> = this._selection$.asObservable();
	selectedColumn: SelectedColumn;
	private _selectedColumn$ = new ReplaySubject<SelectedColumn>(1);
	selectedColumn$ = this._selectedColumn$.asObservable();

	constructor(private kanbanSrv: KanbanService) {
		// TODO check if subscription is removed when we change page
		this.kanbanSrv.columns$
			.subscribe(columns => this.checkSelection(columns));
		this.kanbanSrv.multipleDrop$
			.subscribe(dropEvent => this.onDrop(dropEvent));
	}


	selectAllFromColumn(optionalColumn?: KanbanColumn) {
		const column = optionalColumn || this.selectedColumn.column;
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
		if (!this.selectedColumn || this.selectedColumn.column.id !== column.id) {
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

	get selectableItems$ () {
		return this.selectedColumn$.pipe(
			map(column => column ? column.column.data : []),
		);
	}

	/**
	 * checks the selection of the current column in case we add / remove items
	 */
	private checkSelection(columns: KanbanColumn[]) {
		if (!this.selectedColumn) {
			return;
		}

		const selectedColId = this.selectedColumn.column.id;
		const column = columns.find(col => col.id === selectedColId);

		// in case of a delete we remove the keys from selection
		Array.from(this.selection.keys()).forEach(id => {
			if (!column.dataMap.has(id)) {
				this.selection.delete(id);
			}
		});

		if (this.selection.size === 0) {
			this.selectedColumn = undefined;
		} else if (this.selection.size === column.data.length) {
			this.selectedColumn = { column, state: 'selectedAll' };
		} else {
			this.selectedColumn = { column, state: 'selectedPartial' };
		}
		this.emit();
	}

	private onDrop({ to }: { to: KanbanColumn}) {
		const state = to.data.length === this.selection.size ? 'selectedAll' : 'selectedPartial';
		this.selectedColumn = { column: to, state };
		this.emit();
	}

	private emit() {
		this._selectedColumn$.next(this.selectedColumn);
		this._selection$.next(this.selection);
	}
}
