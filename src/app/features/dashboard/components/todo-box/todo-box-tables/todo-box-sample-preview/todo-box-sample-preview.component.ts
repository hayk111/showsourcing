import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { TableConfig } from '~core/list-page';
import { Sample } from '~core/models';

const tableConfig: TableConfig = {
	name: { title: 'name', translationKey: 'name', width: 240, sortProperty: 'name' },
	product: { title: 'product', translationKey: 'product', width: 180, sortProperty: 'product.name' },
	status: { title: 'status', translationKey: 'status', width: 110, sortProperty: 'status.step' },
};

@Component({
	selector: 'todo-box-sample-preview-app',
	templateUrl: './todo-box-sample-preview.component.html',
	styleUrls: ['./todo-box-sample-preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodoBoxSamplePreviewComponent implements OnInit {

	tableConfig = tableConfig;

	@Input() rows: Sample[];

	constructor() { }

	ngOnInit() {
	}

}
