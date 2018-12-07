import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { ERM, Sample } from '~core/models';
import { ID } from '~utils/id.utils';

@Component({
	selector: 'sample-list-view-app',
	templateUrl: './sample-list-view.component.html',
	styleUrls: [
		'./sample-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleListViewComponent extends ListViewComponent<Sample> implements OnInit {

	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	erm = ERM;

	constructor() { super(); }

	ngOnInit() {
	}

}
