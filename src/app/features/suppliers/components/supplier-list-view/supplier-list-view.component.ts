import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
} from '@angular/core';
import { Supplier } from '~suppliers/models';

@Component({
	selector: 'supplier-list-view-app',
	templateUrl: './supplier-list-view.component.html',
	styleUrls: ['./supplier-list-view.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierListViewComponent implements OnInit {
	@Input() suppliers: Array<Supplier> = [];
	@Input() selection: Map<string, boolean>;
	@Output() supplierSelect = new EventEmitter<string>();
	@Output() supplierUnselect = new EventEmitter<string>();
	@Output() supplierOpen = new EventEmitter<string>();

	constructor() {}

	ngOnInit() {}

	onSelect(event, id: string) {
		if (event.target.checked) {
			this.supplierSelect.emit(id);
		} else {
			this.supplierUnselect.emit(id);
		}
		event.stopPropagation();
	}
}
