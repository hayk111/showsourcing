import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'realm-graphql-client';
import { Supplier, Product } from '~core/models';

@Component({
	selector: 'top-panel-action-buttons-app',
	templateUrl: './top-panel-action-buttons.component.html',
	styleUrls: ['./top-panel-action-buttons.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelActionButtonsComponent implements OnInit {

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
