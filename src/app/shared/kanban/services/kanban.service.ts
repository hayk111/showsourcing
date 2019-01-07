import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { KanbanColumn } from '../interfaces';
import { Status } from '~core/models/status.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { statusToColor } from '~utils/status-to-color.function';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Injectable()
export class KanbanService {

	private _columns$ = new Subject<KanbanColumn[]>();
	columns$ = this._columns$.asObservable();
	private columns: KanbanColumn[];
	// <column id, column> for easy access
	private columnMap = new Map<string, KanbanColumn>();
	// dataMap for easy access when making an update
	private dataMap = new Map<string, any>();
	// position of a data within a specific column for easy updates
	private dataPositionMap = new Map<string, { col: string, index: number }>();


	/** converts an array of status to kanban columns */
	setColumnsFromStatus(statuses: Status[]) {
		this.setColumns(statuses.map(status => this.statusToKanbanCol(status)));
	}

	/**
	 * @param status: Status of the columns
	 * @param data: data of column
	 * @param totalData: number total data for that column
	 */
	private statusToKanbanCol(
		status: Status,
		data: any[] = [],
		totalData = 0): KanbanColumn {
		const constPipe = new ConstPipe();
		// make the columns
		return {
			id: status.id,
			title: constPipe.transform(status.name, 'status'),
			color: statusToColor(status.category),
			data,
			totalData
		};
	}

	/** set the columns for the service */
	private setColumns(columns: KanbanColumn[]) {
		this.columns = columns;
		this.columns.forEach(c => this.columnMap.set(c.id, c));
		this._columns$.next([...this.columns]);
	}

	/** sets data of specific column */
	setData(data: any[], colId: string) {
		data.forEach((d, index) => this.dataPositionMap.set(d.id, { col: colId, index }));
		this.columnMap.get(colId).data = [...data];
		this._columns$.next([...this.columns]);
	}

	/** sets total of specific column */
	setTotal(total: number, colId: string) {
		this.columnMap.get(colId).totalData = total;
	}

	/** since we are working with copy of data we need
	 * to update those to keep the view updated */
	updateData(item: any) {
		const position = this.dataPositionMap.get(item.id);
		const column = this.columnMap.get(position.col);
		column.data[position.index] = { ...column.data[position.index], ...item };
		this._columns$.next([...this.columns]);
	}

	moveItemInsideColumn(colId: string, previousIndex: number, currentIndex: number) {
		const column = this.columnMap.get(colId);
		moveItemInArray(column.data, previousIndex, currentIndex);
		// for change detection
		column.data = [...column.data];
		this._columns$.next([...this.columns]);
	}

	transferItem(prevColId: string, currColId: string, previousIndex: number, currentIndex: number) {
		const previousCol = this.columnMap.get(prevColId);
		const currentCol = this.columnMap.get(currColId);
		transferArrayItem(
			previousCol.data,
			currentCol.data,
			previousIndex,
			currentIndex
		);
		previousCol.data = [...previousCol.data];
		currentCol.data = [...currentCol.data];
		this._columns$.next([...this.columns]);
	}

}
