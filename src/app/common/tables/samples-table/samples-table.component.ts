import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SampleService } from '~core/entity-services';
import { EntityTableComponent, TableConfigType } from '~core/list-page';
import { ERM, Sample, User } from '~core/models';
import { ID } from '~utils/id.utils';
import { bigTableConfig, mediumTableConfig } from '../products-table/config';
import { smallTableConfig } from './config';


@Component({
	selector: 'samples-table-app',
	templateUrl: './samples-table.component.html',
	styleUrls: [
		'./samples-table.component.scss',
	],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SamplesTableComponent extends EntityTableComponent<Sample> implements OnInit {
	columns = [
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
	@Input() tableConfigType: TableConfigType = 'big';
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

	ngOnInit() {
		this.tableConfig = this.getTableFromType();
		super.ngOnInit();
	}

	getTableFromType() {
		switch (this.tableConfigType) {
			case 'big':
				return bigTableConfig;
			case 'medium':
				return mediumTableConfig;
			case 'small':
				return smallTableConfig;
		}
	}

	changeAssignee(sample: Sample, assignee: User) {
		this.sampleSrv.update({ id: sample.id, assignee }).subscribe();
	}

}
