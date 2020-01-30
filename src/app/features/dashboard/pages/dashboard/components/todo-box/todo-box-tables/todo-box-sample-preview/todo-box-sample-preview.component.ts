import { ChangeDetectionStrategy, Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Sample } from '~core/ORM/models';
import { SampleService } from '~core/ORM/services';
import { TableConfig } from '~common/tables/entity-table.component';

const tableConfig: TableConfig = {
	name: { name: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	product: { name: 'product', translationKey: 'product', width: 180, sortProperty: 'product.name' },
	status: { name: 'status', translationKey: 'status', width: 110, sortProperty: 'status.step' },
};

@Component({
	selector: 'todo-box-sample-preview-app',
	templateUrl: './todo-box-sample-preview.component.html',
	styleUrls: ['./todo-box-sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoxSamplePreviewComponent implements OnInit {
	@Output() updated = new EventEmitter<undefined>();
	@Input() rows: Sample[];

	tableConfig = tableConfig;

	constructor(private sampleSrv: SampleService) { }

	ngOnInit() {
		this.sampleSrv.sampleListUpdate$.subscribe(_ => this.updated.emit());
	}

	update(ev: any) {
		this.sampleSrv.update(ev).subscribe();
		this.updated.emit();
	}

}
