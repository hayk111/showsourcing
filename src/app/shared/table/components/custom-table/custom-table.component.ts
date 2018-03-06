import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	ContentChild,
	Output,
	EventEmitter,
	AfterContentInit,
} from '@angular/core';
import { TableDescriptor, ColumnDirective } from '~app/shared/table';

@Component({
	selector: 'custom-table-app',
	templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {
	@Input() descriptor: TableDescriptor = [];
	@Input() rows: Array<any> = [];

	constructor() {}

	ngOnInit() {}
}
