import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { ERM, productFields } from '~core/models';
import { PickerField } from '~shared/selectors';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'mass-edit-dlg-app',
	templateUrl: './mass-edit-dlg.component.html',
	styleUrls: ['./mass-edit-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MassEditDlgComponent implements OnInit {

	@Input() pickerFields: PickerField[] = productFields;
	erm = ERM;
	choice$: ReplaySubject<PickerField> = new ReplaySubject<PickerField>(1);

	constructor() { }

	ngOnInit() {
	}

	updateChoice(choice) {
		const temp = this.pickerFields.find(field => field.name === choice);
		this.choice$.next(temp || null);
	}
}
