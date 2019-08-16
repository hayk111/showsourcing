import { Component, OnInit, Input } from '@angular/core';
import { EntityName } from '~core/models';

@Component({
	selector: 'name-query-app',
	template: `
		<ng-container>{{entity?.name}}</ng-container>
	`,
})
export class NameQueryComponent implements OnInit {

	@Input() entity: any;

	ngOnInit() {
	}

}
