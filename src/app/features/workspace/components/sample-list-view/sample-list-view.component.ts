import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { ListViewComponent } from '~core/list-page';
import { Sample } from '~core/models';

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
	@ViewChild('contextualMenu') contextualMenuTemplate: TemplateRef<any>;

	constructor() { super(); }

	ngOnInit() {
	}

}
