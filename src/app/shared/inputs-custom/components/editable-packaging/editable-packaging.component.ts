import { ChangeDetectionStrategy, Component, Output, EventEmitter } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { Packaging } from '~core/erm3';



@Component({
	selector: 'editable-packaging-app',
	templateUrl: './editable-packaging.component.html',
	styleUrls: ['./editable-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePackagingComponent)]

})
export class EditablePackagingComponent extends AbstractInput {

	@Output() saved = new EventEmitter<undefined>();

	value: Packaging = {};
	resetValues = {};

	storeValue(property: string, value: any) {
		this.resetValues[property] = value;
	}

	onSave(value, updated) {
		const toUpdate = { ...value, ...updated };
		this.onChangeFn(toUpdate);
		this.saved.emit(toUpdate);
	}

	onCancel(property: string) {
		this.value[property] = this.resetValues[property];
	}
}
