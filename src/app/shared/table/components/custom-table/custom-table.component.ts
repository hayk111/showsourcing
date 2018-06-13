import {
	Component,
	OnInit,
	Input,
	ChangeDetectionStrategy,
	ContentChild,
	Output,
	EventEmitter,
	AfterContentInit,
	TemplateRef
} from '@angular/core';
import { TableDescriptor, ColumnDirective } from '~shared/table';

@Component({
	selector: 'custom-table-app',
	templateUrl: './custom-table.component.html',
	styleUrls: ['./custom-table.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomTableComponent {
	@Output() bottomReached = new EventEmitter<any>();
	@Output() sort = new EventEmitter<string>();
	@Input() descriptor: TableDescriptor = [];
	@Input() contextualMenu: TemplateRef<any>;
	@Input() rows: Array<any> = [];
	@Input() pending: boolean;
	// maps of the <id, true> so we can access the items that are selected
	@Input() selected: Map<string, boolean> = new Map();
	@Output() selectOne = new EventEmitter<string>();
	@Output() unselectOne = new EventEmitter<string>();

	constructor() { }

}
