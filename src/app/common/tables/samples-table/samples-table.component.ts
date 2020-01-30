import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SampleService } from '~core/ORM/services';
import { ERM, Sample } from '~core/ORM/models';
import { ID } from '~utils/id.utils';
import { defaultConfig } from '../default-columns/default-config';
import { EntityTableComponent } from '../entity-table.component';


@Component({
	selector: 'samples-table-app',
	templateUrl: './samples-table.component.html',
	styleUrls: [
		'./samples-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesTableComponent extends EntityTableComponent<Sample> implements OnInit {
	static DEFAULT_COLUMNS = [
		'logo',
		'name',
		'preview',
		'product',
		'supplier',
		'status',
		'assignee',
		'createdBy',
		'creationDate'
	];
	static DEFAULT_TABLE_CONFIG = defaultConfig;
	@Input() columns = SamplesTableComponent.DEFAULT_COLUMNS;
	@Input() tableConfig = SamplesTableComponent.DEFAULT_TABLE_CONFIG;
	@Output() openSupplier = new EventEmitter<ID>();
	@Output() openProduct = new EventEmitter<ID>();
	@Output() archive = new EventEmitter<Sample>();
	@Output() showItemsPerPage = new EventEmitter<number>();

	@ViewChild('contextualMenu', { static: false }) contextualMenuTemplate: TemplateRef<any>;

	erm = ERM;

	constructor(
		public translate: TranslateService,
		public sampleSrv: SampleService
	) { super(); }

}
