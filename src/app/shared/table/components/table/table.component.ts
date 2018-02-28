import { AfterContentInit, Component, ContentChildren, Input, OnInit, QueryList, ChangeDetectionStrategy } from '@angular/core';
import { ColumnDirective } from '~app/shared/table/components/column.directive';

@Component({
  selector: 'table-app',
  templateUrl: './table.component.html',
	styleUrls: ['./table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TableComponent implements OnInit, AfterContentInit {
	@Input() rows: Array<any>
	@ContentChildren(ColumnDirective) columns: QueryList<ColumnDirective>

  constructor() { }

  ngOnInit() {
  }

	ngAfterContentInit() {
	}

	sort(column: ColumnDirective) {
		const currentSort = column.currentSort;
		this.columns.forEach(c => c.resetSort());
		column.toggleSort(currentSort);
	}
}
