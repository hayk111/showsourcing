import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { Packaging } from '~core/erm3';



@Component({
	selector: 'editable-packaging2-app',
	templateUrl: './editable-packaging.component.html',
	styleUrls: ['./editable-packaging.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditablePackaging2Component)]

})
export class EditablePackaging2Component extends AbstractInput {
	value: Packaging = {};
	resetValues = {};

	storeValue(property: string, value: any) {
		this.resetValues[property] = value;
	}

	onCancel(property: string) {
		this.value[property] = this.resetValues[property];
	}
}
