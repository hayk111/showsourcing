import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { KanbanColumn } from '../interfaces';
import { Status } from '~core/models/status.model';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { statusToColor } from '~utils/status-to-color.function';

@Injectable()
export class KanbanService {

	private _columns$ = new Subject<KanbanColumn[]>();
	columns$ = this._columns$.asObservable();
	private columns: KanbanColumn[];
	private columnMap = new Map<string, KanbanColumn>();
	// dataMap for easy access when making an update
	private dataMap = new Map<string, any>();

	/**
	 * converts an array of productStatusType and and array of products to an array of kanbanColumn
	 * @param types: ProductStatusType[] for the columns
	 * @param products: Product[] for the data of each column
	 * @param withoutStatus: boolean (default true) whether or not we enable a column for products without status
	 */
	private statusToKanbanCol(
		type: Status,
		data: any[] = [],
		totalData = 0): KanbanColumn {
		const constPipe = new ConstPipe();
		// make the columns
		return {
			id: type.id,
			title: constPipe.transform(type.name, 'status'),
			color: statusToColor(type.category),
			data,
			totalData
		};

	}

	setColumnsFromStatus(statuses: Status[]) {
		this.setColumns(statuses.map(status => this.statusToKanbanCol(status)));
	}

	setColumns(columns: KanbanColumn[]) {
		this.columns = columns;
		this.columns.forEach(c => this.columnMap.set(c.id, c));
		this._columns$.next([...this.columns]);
	}

	addData(data: any[], colId: string) {
		data.forEach(d => this.dataMap.set(d.id, d));
		const currentData = this.columnMap.get(colId).data;
		this.columnMap.get(colId).data.push(...data);
		this._columns$.next([...this.columns]);
	}

	addTotal(total: number, colId: string) {
		this.columnMap.get(colId).totalData = total;
	}

}
