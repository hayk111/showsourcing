import { Directive, Input, TemplateRef, EventEmitter, Output, OnInit } from '@angular/core';
import { defaultComparator } from '../utils/comparator.function';

@Directive({
	selector: '[columnApp]',
})
export class ColumnDirective implements OnInit {
	// tslint:disable-next-line:no-input-rename
	@Input('columnApp') title: string;
	@Input() sortable = true;
	// property used to make the sorting
	// we default the sorting property to the title lower cased
	@Input() sortWith = '';
	// comparator function for sorting
	@Input() width;
	@Output() sortRequest = new EventEmitter<string>();
	currentSort: 'none' | 'asc' | 'desc' = 'none';
	@Input() comparator = (a, b) => defaultComparator(a[this.sortWith], b[this.sortWith]);

	constructor(public template: TemplateRef<any>) { }

	ngOnInit() {
		// we default the sorting property to the title lower cased
		this.sortWith = this.sortWith || this.title.toLowerCase();
	}

	toggleSort(lastSort: 'none' | 'asc' | 'desc') {
		if (this.sortable) {
			this.currentSort = lastSort === 'asc' ? 'desc' : 'asc';
			this.sortRequest.emit(this.currentSort);
		}
	}

	resetSort() {
		this.currentSort = 'none';
	}

	sort(rows: Array<any>) {
		debugger;
		if (this.currentSort === 'asc') {
			return [...rows].sort((a, b) => this.comparator(a, b));
		} else {
			return [...rows].sort((a, b) => this.comparator(a, b) * -1);
		}
	}
}
