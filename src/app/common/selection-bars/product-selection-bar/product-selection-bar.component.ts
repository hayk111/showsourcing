import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { Project, ERM, Product } from '~core/models';
import { EntitySelectionBarComponent } from '~core/selection';

@Component({
	selector: 'product-selection-bar-app',
	templateUrl: './product-selection-bar.component.html',
	styleUrls: ['./product-selection-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSelectionBarComponent extends EntitySelectionBarComponent {

	@Input() favorite: boolean;
	@Output() compareProducts = new EventEmitter<null>();
	@Output() archiveProducts = new EventEmitter<Product[]>();
	@Output() requestTeamFeedback = new EventEmitter<null>();
	@Output() createRequest = new EventEmitter<null>();
	@Output() export = new EventEmitter<null>();
	@Output() deleted = new EventEmitter<null>();
	@Output() addProject = new EventEmitter<Project[]>();
	@Output() massEdit = new EventEmitter<null>();

	constructor() {
		super();
	}

}
