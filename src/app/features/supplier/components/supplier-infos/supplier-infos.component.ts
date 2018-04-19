import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Patch, Supplier, Tag, productActions } from '~entity';
import { Store } from '@ngrx/store';
import { UserService } from '~app/features/user';

@Component({
	selector: 'supplier-infos-app',
	templateUrl: './supplier-infos.component.html',
	styleUrls: ['./supplier-infos.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SupplierInfosComponent implements OnInit {
	@Input() supplier: Supplier;
	@Output() update = new EventEmitter<Patch>();
	@Output() tagAdded = new EventEmitter<Tag>();
	@Output() tagRemoved = new EventEmitter<Tag>();
	@Output() tagCreated = new EventEmitter<String>();

	constructor() { }

	ngOnInit() { }

	onUpdate(value: any, propName: string) {
		const patch: Patch = { propName, value, id: this.supplier.id };
		this.update.emit(patch);
	}


}
