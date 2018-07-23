import { Directive, Input, TemplateRef, EventEmitter, Output, OnInit } from '@angular/core';
import { defaultComparator } from '~shared/table/utils/comparator.function';
import { Resolver } from '~utils/resolver.class';
import { Sort } from '~shared/table/components/sort.interface';

@Directive({
	selector: '[columnApp]',
})
export class ColumnDirective implements OnInit {
	// tslint:disable-next-line:no-input-rename
	@Input('columnApp') title: string;
	@Input() type: string;
	@Input() sortable = true;
	// whether the sorting happens in the table component or we relieve that to
	// some other business logic (async server calls).
	@Input() autoSort = false;
	// property used to make the sorting
	// we default the sorting property to the title lower cased
	@Input() sortBy = '';
	// width of the column
	@Input() width;
	// whether the column grows if the table hasn't reached full width
	@Input() grows = true;
	@Output() sort = new EventEmitter<Sort>();
	@Input() sortOrder: 'NONE' | 'ASC' | 'DESC' = 'NONE';
	// comparator function for sorting
	@Input() comparator = (a, b) => defaultComparator(a, b);

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

	internalSort(rows: Array<any>) {
		if (this.sortOrder === 'ASC') {
			return [...rows].sort((a, b) => {
				// resolver used so we can access props with dot notation
				const aProp = Resolver.resolve(this.sortBy, a);
				const bProp = Resolver.resolve(this.sortBy, b);
				return this.comparator(aProp, bProp);
			});
		} else {
			return [...rows].sort((a, b) => {
				const aProp = Resolver.resolve(this.sortBy, a);
				const bProp = Resolver.resolve(this.sortBy, b);
				return this.comparator(aProp, bProp) * -1;
			});
		}
	}
}
