import { Directive, Input, TemplateRef, EventEmitter, Output, OnInit } from '@angular/core';
import { defaultComparator } from '~shared/table/utils/comparator.function';
import { Sort } from '~shared/table/components/sort.interface';

@Directive({
	selector: '[columnApp]',
})
export class ColumnDirective implements OnInit {
	// tslint:disable-next-line:no-input-rename
	@Input('columnApp') title: string;
	@Input() type: string;
	@Input() sortable = true;
	// property used to make the sorting
	// we default the sorting property to the title lower cased
	@Input() sortBy = '';
	// width of the column
	@Input() width;
	// whether the column grows if the table hasn't reached full width
	@Input() minWidth = 50;
	@Input() grows = true;
	@Input() sortOrder: 'NONE' | 'ASC' | 'DESC' = 'NONE';

	constructor(public template: TemplateRef<any>) { }

	ngOnInit() {
		// we default the sorting property to the title lower cased
		this.sortBy = this.sortBy || this.title.toLowerCase();
	}

	toggleSort() {
		if (this.sortable) {
			this.sortOrder = this.sortOrder === 'ASC' ? 'DESC' : 'ASC';
		}
	}

	resetSort() {
		this.sortOrder = 'NONE';
	}

}
