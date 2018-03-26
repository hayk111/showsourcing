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
	@Input() rows: Array<any>;
	@Output() bottomReached = new EventEmitter<null>();
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>;

	constructor() { }

	sort(column: ColumnDirective) {
		const currentSort = column.currentSort;
		this.columns.forEach(c => c.resetSort());
		column.toggleSort(currentSort);
	}
}
