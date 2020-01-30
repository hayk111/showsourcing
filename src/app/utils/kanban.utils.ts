import { combineLatest, Observable } from 'rxjs';
import { ListQuery } from '~core/ORM/services/_global/list-query.interface';
import { Status } from '~core/ORM/models/status.model';
import { ProductStatus } from '~core/ORM/models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-interface.class';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';

import { ID } from './id.utils';
import { StatusUtils } from './status.utils';


export function makeColumns(
	statuses: Status[],
	dataMap: Map<ID, ListQuery<any>>,
	totalMap: Map<ID, ListQuery<number>>
) {
	const columns$ = statuses.map(status => {
		const data$ = dataMap.get(status.id).items$;
		const total$ = totalMap.get(status.id).items$ as unknown as Observable<number>;
		return combineLatest(
			data$,
			total$,
			(data, total) => {
				return statusToKanbanCol(status, data, total);
			});
	});
	return combineLatest(...columns$);
}

/**
 * converts an array of productStatusType and and array of products to an array of kanbanColumn
 * @param types: ProductStatusType[] for the columns
 * @param products: Product[] for the data of each column
 * @param withoutStatus: boolean (default true) whether or not we enable a column for products without status
 */
export function statusToKanbanCol(
	type: ProductStatus,
	data: any[] = [],
	totalData = 0): KanbanColumn {
	const constPipe = new ConstPipe();
	// make the columns
	return {
		id: type.id,
		title: constPipe.transform(type.name, 'status'),
		color: StatusUtils.getStatusColor(type),
		data,
		totalData
	};

}
