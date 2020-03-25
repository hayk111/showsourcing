import { ChangeDetectionStrategy, Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Sample } from '~models';

@Component({
	selector: 'samples-table-app',
	templateUrl: './samples-table.component.html',
	styleUrls: [
		'./samples-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesTableComponent extends EntityTableComponent<Sample> {

	@Output() archive = new EventEmitter<Sample>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor(public translate: TranslateService) {
		super();
	}

}
