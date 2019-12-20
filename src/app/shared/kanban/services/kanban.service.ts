import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Status } from '~core/models/status.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { StatusUtils } from '~utils';

import { KanbanColumn, KanbanConfig } from '../interfaces';


/**
 * service to move items between columns in kanban
 *
 * the columns are made with map that are converted to array,
 * the reason is for easy access when we need to modify the data,
 * and it's converted back to array because it's easier to deal with in
 * an angular template.
 *
 * There is a lot of back and forth between array and map that can
 * probably be optimised.
 *
 */
@Injectable()
export class KanbanService {

	private _kanbanConfig$ = new ReplaySubject<KanbanConfig>(1);
	columns$: Observable<KanbanColumn[]> = this._kanbanConfig$.asObservable().pipe(
		map(config => this.configToCols(config))
	);
	private kanbanConfig: KanbanConfig;

	private configToCols(kanbanConfig: KanbanConfig): KanbanColumn[] {
		const columns = Array.from(kanbanConfig.values());
		columns.forEach(c => c.data = Array.from(c.dataMap.values()));
		return columns;
	}

	/** converts an array of status to kanban columns */
	setColumnsFromStatus(statuses: Status[]) {
		const columns = statuses.map(status => this.statusToKanbanCol(status));
		this.kanbanConfig = this.mapFromArray(columns);
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	private mapFromArray(arr: any[]): Map<string, any> {
		return arr.reduce((prev, curr) => prev.set(curr.id, curr), new Map());
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
		// data map
		const dataMap = this.mapFromArray(data);
		// make the columns
		return new KanbanColumn({
			id: status.id,
			title: constPipe.transform(status.name, 'status'),
			color: StatusUtils.getStatusColor(status),
			dataMap,
			totalData
		});
	}



	/** sets data of specific column */
	setData(data: any[] = [], colIds: string[]) {
		colIds.forEach(id => {
			this.kanbanConfig.get(id).dataMap = this.mapFromArray(data);
		});
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	addItems(data: any[] = [], colId: string) {
		const dataMap = this.kanbanConfig.get(colId).dataMap;
		data.forEach(item => {
			dataMap.set(item.id, item);
		});
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	/** sets total of specific column */
	setTotal(total: number, colIds: string[]) {
		colIds.forEach(id => {
			this.kanbanConfig.get(id).totalData = total;
		});
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	/** since we are working with copy of data we need
	 * to update those to keep the view updated */
	updateData(item: any) {
		// find item in column and update it
		const columns = Array.from(this.kanbanConfig.values());
		const column = columns.find(col => col.dataMap.has(item.id));
		const localItem = column.dataMap.get(item.id);
		// the new item is the concatenation of both the local and update
		const newItem = { ...localItem, ...item };
		column.dataMap.set(item.id, newItem);

		this._kanbanConfig$.next(this.kanbanConfig);
	}

	updateMany(items: any[]) {
		const columns = Array.from(this.kanbanConfig.values());
		items.forEach(item => {
			// find item in column and update it
			const column = columns.find(col => col.dataMap.has(item.id));
			const localItem = column.dataMap.get(item.id);
			// the new item is the concatenation of both the local and update
			const newItem = { ...localItem, ...item };
			column.dataMap.set(item.id, newItem);
		});

		this._kanbanConfig$.next(this.kanbanConfig);
	}


	moveItemInsideColumn(colId: string, previousIndex: number, currentIndex: number) {
		const columnMap = this.kanbanConfig.get(colId);
		// converting to array for easy moving
		const arr = Array.from(columnMap.dataMap.values());
		moveItemInArray(arr, previousIndex, currentIndex);
		// converting back to map
		columnMap.dataMap = this.mapFromArray(arr);
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	transferItem(prevColId: string, currColId: string, previousIndex: number, currentIndex: number) {
		const previousCol = this.kanbanConfig.get(prevColId);
		const currentCol = this.kanbanConfig.get(currColId);
		const prevArr = Array.from(previousCol.dataMap.values());
		const currArr = Array.from(currentCol.dataMap.values());

		transferArrayItem(
			prevArr,
			currArr,
			previousIndex,
			currentIndex
		);

		previousCol.totalData--;
		currentCol.totalData++;
		previousCol.dataMap = this.mapFromArray(prevArr);
		currentCol.dataMap = this.mapFromArray(currArr);

		this._kanbanConfig$.next(this.kanbanConfig);
	}

	transferMultiple(ids: string[], toColId: string, toIndex: number) {
		const columns = Array.from(this.kanbanConfig.values());
		const currentCol = this.kanbanConfig.get(toColId);
		const currArr = Array.from(currentCol.dataMap.values());

		ids.forEach(id => {
			const previousCol = columns.find(col => col.dataMap.has(id));
			const prevArr = Array.from(previousCol.dataMap.values());
			const previousIndex = prevArr.findIndex(item => item.id === id);

			transferArrayItem(
				prevArr,
				currArr,
				previousIndex,
				toIndex
			);
			previousCol.totalData--;
			currentCol.totalData++;
			previousCol.dataMap = this.mapFromArray(prevArr);
		});

		currentCol.dataMap = this.mapFromArray(currArr);
		this._kanbanConfig$.next(this.kanbanConfig);
	}

	// when the status of an item changes outside the kanban we want to
	// update the kanban as well
	onExternalStatusChange(items: any[]) {
		// read status for more info
		// find item in column and update it
		const columns = Array.from(this.kanbanConfig.values());
		items.forEach(item => {
			const previousCol = columns.find(col => col.dataMap.has(item.id));
			const currentCol = this.kanbanConfig.get(item.status.id);
			const prevArr = Array.from(previousCol.dataMap.values());
			const currArr = Array.from(currentCol.dataMap.values());

			const previousIndex = Array.from(previousCol.dataMap.values())
				.findIndex(v => v.id === item.id);

			transferArrayItem(
				prevArr,
				currArr,
				previousIndex,
				0
			);
			previousCol.totalData--;
			currentCol.totalData++;
			previousCol.dataMap = this.mapFromArray(prevArr);
			currentCol.dataMap = this.mapFromArray(currArr);
		});

		this._kanbanConfig$.next(this.kanbanConfig);
	}

	deleteItems(ids: string[]) {
		const columns = Array.from(this.kanbanConfig.values());
		ids.forEach(id => {
			const column = columns.find(col => col.dataMap.has(id));
			column.dataMap.delete(id);
			column.totalData--;
		});
		this._kanbanConfig$.next(this.kanbanConfig);
	}

}
