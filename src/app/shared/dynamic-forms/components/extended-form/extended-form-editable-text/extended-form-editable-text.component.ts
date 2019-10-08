import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { AbstractExtendedFormComponent } from '../abstract-extended-form.component';
import { DynamicFormConfig } from '~shared/dynamic-forms/models/dynamic-form-config.interface';

@Component({
	selector: 'extended-form-editable-text-app',
	templateUrl: './extended-form-editable-text.component.html',
	styleUrls: ['./extended-form-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class ExtendedFormEditableTextComponent extends AbstractExtendedFormComponent {
	@Input() config: DynamicFormConfig;
	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();

	isText(type: string) {
		return type === 'text' || type === 'decimal' || type === 'tel' || type === 'number';
	}

	/**
	 * toggles boolean value if the click was performed outside the radio-app (child), but inside editable-field-app (parent)
	 * @param event mouse event click
	 */
	booleanEditableField(event) {
		if (event && event.target.type !== 'radio') {
			this.field.value === 'true' ? this.toggleBoolean(true) : this.toggleBoolean(false);
		}
	}

}
