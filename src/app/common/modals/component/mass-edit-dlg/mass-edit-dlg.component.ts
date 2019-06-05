import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import {
	ExtendedFieldDefinitionService,
} from '~core/entity-services/extended-field-definition/extended-field-definition.service';
import { EntityMetadata, ERM, ExtendedFieldDefinition, productFields } from '~core/models';
import { PickerField } from '~shared/selectors';

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

	constructor(private extendedFDSrv: ExtendedFieldDefinitionService) { }

	ngOnInit() {
		switch (this.type) {
			case ERM.PRODUCT:
				this.pickerFields = productFields;
				this.definitions$ = this.extendedFDSrv.queryMany({ query: 'target == "Product"', sortBy: 'order' });
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
}
