import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { EntityMetadata, ERM, ExtendedFieldDefinition, productFields, Product } from '~core/models';
import { PickerField } from '~shared/selectors';
import { take, map, switchMap, tap } from 'rxjs/operators';
import { DialogService, CloseEventType } from '~shared/dialog';
import { uuid } from '~utils';
import { ProductService } from '~core/entity-services';

@Component({
	selector: 'mass-edit-dlg-app',
	templateUrl: './mass-edit-dlg.component.html',
	styleUrls: ['./mass-edit-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MassEditDlgComponent implements OnInit {

	@Input() type: EntityMetadata;
	@Input() items: any[];

	pickerFields: PickerField[] = productFields;
	erm = ERM;
	choice$: ReplaySubject<PickerField> = new ReplaySubject<PickerField>(1);
	definitions$: Observable<ExtendedFieldDefinition[]>;
	value: any;

	constructor(
		private extendedFDSrv: ExtendedFieldDefinitionService,
		private productSrv: ProductService,
		private dlgSrv: DialogService
	) { }

	ngOnInit() {
		switch (this.type) {
			case ERM.PRODUCT:
				this.pickerFields = productFields;
				this.definitions$ = this.extendedFDSrv.queryMany({ query: 'target contains "product."', sortBy: 'order' });
				break;
			default: throw Error(`No PickerField associated to this ERM ${this.type}`);
		}
	}

	updateChoice(choice) {
		const temp = this.pickerFields.find(field => field.name === choice);
		this.choice$.next(temp || null);
		this.value = null;
	}

	getName(type) {
		let name;
		const entityName = ERM.getEntityMetadata(type);
		switch (entityName) {
			case ERM.USER:
				const firstName = this.value.firstName || '', lastName = this.value.lastName || '';
				// TODO use the pipe on supplier-connect
				name = firstName + (lastName ? ' ' : '') + lastName;
				break;
			default:
				name = this.value.name || '';
				break;
		}
		return name;
	}

	statusUpdated(item) {
		// this condition exists since input price, when blur drop a change that returns the element in the DOM
		// instead of the price object. This way we don't store the DOM element
		if (item.__proto__.constructor.name !== 'Event')
			this.value = item;
	}

	getMultipleName() {
		const name = (this.value || []).map(val => val.name).join(', ');
		return name;
	}

	update() {
		// MAYBE this._destroy take until
		this.choice$.pipe(
			take(1),
			map(choice => this.mapItems(choice)),
			switchMap(items => this.productSrv.updateMany(items))
			// tap(itmes => console.log(itmes)),
			// tap(_ => console.log(this.items))
		).subscribe(_ => this.close());

	}

	private mapItems(choice: PickerField) {
		const prop = choice.attribute || choice.name;
		let mapped;
		// checks if the type needs to update the id's so they don't share the same entity (Price, ExtendedField, Packaging)
		// since the relationship on this objects is 1 - 1
		if (this.resetId(choice))
			mapped = this.items.map(item => {
				// if its an array we have to update the ids of all the elements inside the array
				if (this.isArray(this.value))
					this.value = this.value.map(val => ({ ...val, id: uuid() }));
				// otherwise we only update the object
				else
					this.value = { ...this.value, id: uuid() };
				return ({ id: item.id, [prop]: this.value });
			});
		else
			mapped = this.items.map(item => ({ id: item.id, [prop]: this.value }));

		return mapped;
	}

	// returns true if the selected type has to reset the ids of the values when updating
	private resetId(choice) {
		switch (choice.type) {
			case 'packaging':
			case 'extendedField':
			case 'price':
				return true;
			default:
				return false;
		}
	}

	private isArray(item) {
		// we could use Array.isArray(item) but for compatibility we use this
		return Object.prototype.toString.call(item) === '[object Array]';
	}

	close() {
		this.dlgSrv.close({ type: CloseEventType.CANCEL });
	}
}
