import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, OnChanges, Output, EventEmitter } from '@angular/core';
import { ListViewComponent } from '~core/list-page/list-view.component';
import { Sample, ERM } from '~models';
import { Observable, of } from 'rxjs';

@Component({
	selector: 'samples-list-view-app',
	templateUrl: './samples-list-view.component.html',
	styleUrls: [
		'./samples-list-view.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesListViewComponent extends ListViewComponent<Sample> {

	erm = ERM;

	@Output() archive = new EventEmitter<Sample>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor() {
		super();
	}

}
