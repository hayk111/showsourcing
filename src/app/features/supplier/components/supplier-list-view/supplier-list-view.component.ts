import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Supplier, ERM } from '~models';

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

	erm = ERM;

	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	constructor() {
		super();
	}

}
