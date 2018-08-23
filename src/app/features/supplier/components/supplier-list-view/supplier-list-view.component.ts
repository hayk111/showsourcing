import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild, TemplateRef } from '@angular/core';

import { Supplier } from '~models';
import { Sort } from '~shared/table/components/sort.interface';
import { ListViewComponent } from '~shared/list-page/list-view.component';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: [
		'./supplier-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent extends ListViewComponent<Supplier> {
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	constructor() {
		super();
	}
}
