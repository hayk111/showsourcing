import {
	Output,
	Component,
	ContentChildren,
	Input,
	OnInit,
	QueryList,
	ChangeDetectionStrategy,
	EventEmitter,
} from '@angular/core';
import { ColumnDirective } from '~app/shared/table/components/column.directive';

@Component({
	selector: 'table-app',
	templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
	// whether rows are selectable
	@Input() hasSelection = true;
	@Input() rows: Array<any>;
	// whether the table will automatically do it's sorting or will rely on external sorting
	@Input() autoSort = true;
	@Output() bottomReached = new EventEmitter<null>();
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;

	constructor() { }

	sort(column: ColumnDirective) {
		// remove sorting on all column and add the current sort to the correct one
		const currentSort = column.currentSort;
		this.columns.forEach(c => c.resetSort());
		column.toggleSort(currentSort);
		if (this.autoSort)
			this.doAutoSort();
	}

	private doAutoSort() {

	}
}
