import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'name-query-app',
	template: `
		<ng-container>{{obj?.name}}</ng-container>
	`,
})
export class NameQueryComponent implements OnInit {

	@Input() obj: any;
	@Input() field: string;

	ngOnInit() {
		console.log(this.obj);
	}

}
