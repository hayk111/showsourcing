import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patch, Supplier } from '~entity';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Patch>();
	constructor() { }

	ngOnInit() {
	}

	onUpdate(value: any, propName: string) {
		const patch: Patch = { propName, value, id: this.supplier.id };
		this.update.emit(patch);
	}

}
