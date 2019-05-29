import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { EntityMetadata, ERM, productFields } from '~core/models';
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
	value: any;

	constructor() { }

	ngOnInit() {
		switch (this.type) {
			case ERM.PRODUCT:
				this.pickerFields = productFields;
				break;
			default: throw Error(`No PickerField associated to this ERM ${this.type}`);
		}
	}

	updateChoice(choice) {
		const temp = this.pickerFields.find(field => field.name === choice);
		this.choice$.next(temp || null);
		this.value = null;
	}

	statusUpdated(item) {
		// this condition exists since input price, when blur drop a change that returns the element in the DOM
		// instead of the price object. This way we don't store the DOM element
		if (item.__proto__.constructor.name !== 'Event')
			this.value = item;
		console.log(this.value);
	}
}
