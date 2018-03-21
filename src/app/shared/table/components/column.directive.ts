import { Directive, Input, TemplateRef, EventEmitter, Output } from '@angular/core';

@Directive({
	selector: '[columnApp]',
})
export class ColumnDirective {
	@Input('columnApp') title: string;
	@Input() sortable = true;
	@Input() width;
	@Output() sort = new EventEmitter<string>();
	currentSort: 'none' | 'asc' | 'desc' = 'none';

	constructor(public template: TemplateRef<any>) {}

	ngOnInit() {}

	toggleSort(lastSort: 'none' | 'asc' | 'desc') {
		if (this.sortable) {
			this.currentSort = lastSort === 'asc' ? 'desc' : 'asc';
			this.sort.emit(this.currentSort);
		}
	}

	resetSort() {
		this.currentSort = 'none';
	}
}
