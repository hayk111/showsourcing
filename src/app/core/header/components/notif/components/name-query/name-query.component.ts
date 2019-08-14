import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'name-query-app',
	template: `
		<ng-container>{{obj?.name}}</ng-container>
	`,
})
export class NameQueryComponent implements OnInit {

	@Input() obj: any;

	ngOnInit() {
	}

}
