import { Directive, Input, TemplateRef, EventEmitter, Output, OnInit } from '@angular/core';
import { defaultComparator } from '../utils/comparator.function';
import { Resolver } from '~utils/resolver.class';

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
	@Input() sortWith = '';
	// width of the column
	@Input() width;
	// whether the column grows if the table hasn't reached full width
	@Input() grows = true;
	@Output() sortRequest = new EventEmitter<string>();
	@Input() currentSort: 'NONE' | 'ASC' | 'DESC' = 'NONE';
	// comparator function for sorting
	@Input() comparator = (a, b) => defaultComparator(a, b);

	constructor(public template: TemplateRef<any>) { }

	ngOnInit() {
		// we default the sorting property to the title lower cased
		this.sortWith = this.sortWith || this.title.toLowerCase();
	}

	toggleSort(lastSort: 'NONE' | 'ASC' | 'DESC') {
		if (this.sortable) {
			this.currentSort = lastSort === 'ASC' ? 'DESC' : 'ASC';
			this.sortRequest.emit(this.currentSort);
		}
	}

	resetSort() {
		this.currentSort = 'NONE';
	}

	sort(rows: Array<any>) {
		if (this.currentSort === 'ASC') {
			return [...rows].sort((a, b) => {
				// resolver used so we can access props with dot notation
				const aProp = Resolver.resolve(this.sortWith, a);
				const bProp = Resolver.resolve(this.sortWith, b);
				return this.comparator(aProp, bProp);
			});
		} else {
			return [...rows].sort((a, b) => {
				const aProp = Resolver.resolve(this.sortWith, a);
				const bProp = Resolver.resolve(this.sortWith, b);
				return this.comparator(aProp, bProp) * -1;
			});
		}
	}
}
