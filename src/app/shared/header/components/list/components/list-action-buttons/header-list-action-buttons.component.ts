import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'realm-graphql-client';
import { Supplier, Product } from '~core/erm/models';

@Component({
	selector: 'header-list-action-buttons-app',
	templateUrl: './header-list-action-buttons.component.html',
	styleUrls: ['./header-list-action-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderListActionButtonsComponent implements OnInit {

	@Input() hasAssignee = true;
	@Input() user: User;

	@Input() data: Supplier | Product;

	@Output() delete = new EventEmitter<null>();
	@Output() export = new EventEmitter<Supplier | Product>();
	@Output() favorited = new EventEmitter<Supplier | Product>();
	@Output() unfavorited = new EventEmitter<Supplier | Product>();
	@Output() changeUser = new EventEmitter<Supplier | Product>();

	constructor() { }

	ngOnInit() {
	}

}
