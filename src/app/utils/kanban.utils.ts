import { statusToColor } from '~utils/status-to-color.function';
import { ProductStatusType, Product } from '~models';
import { KanbanColumn } from '~shared/kanban/interfaces/kanban-column.interface';

/**
 * converts an array of productStatusType and and array of products to an array of kanbanColumn
 * @param types: ProductStatusType[] for the columns
 * @param products: Product[] for the data of each column
 * @param withoutStatus: boolean (default true) whether or not we enable a column for products without status
 */
export function statusProductToKanbanCol(
	types: ProductStatusType[],
	products: Product[],
	withoutStatus = true): KanbanColumn[] {
	// make the columns
	const cols: KanbanColumn[] = types.map(type => ({
		id: type.id,
		title: type.name,
		color: statusToColor(type.category),
		data: []
	}));

	if (withoutStatus) {
		cols.push({ id: '-1', title: 'New Product', color: 'accent', data: [] });
	}

	// making a map out of the array for easy access
	const colsMap = new Map(
		cols.map(col => ([col.id, col])) as any
	);

	// adding the product to each element of the map
	products.forEach(prod => {
		if (prod.status && prod.status.status) {
			const type = colsMap.get(prod.status.status.id);
			(type as any).data.push(prod);
		} else if (withoutStatus) {
			const type = colsMap.get('-1');
			(type as any).data.push(prod);
		}
	});
	return cols;
}
