import { ChangeDetectionStrategy, Component, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { EntityTableComponent } from '~common/tables/entity-table.component';
import { Sample, ERM } from '~models';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
	selector: 'samples-table-app',
	templateUrl: './samples-table.component.html',
	styleUrls: [
		'./samples-table.component.scss',
		'../../../../../app/theming/specific/list.scss'
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SamplesTableComponent extends EntityTableComponent<Sample> {

	erm = ERM;

	@Output() archive = new EventEmitter<Sample>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	constructor(public translate: TranslateService) {
		super();
	}

}
