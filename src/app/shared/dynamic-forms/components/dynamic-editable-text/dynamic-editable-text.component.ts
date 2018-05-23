import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'dynamic-editable-text-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)]
})
export class DynamicEditableTextComponent extends AbstractInput implements OnInit {
	@Input() customField: CustomField;
	accumulator: string;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
	}

	/** saves the value because an user might cancel */
	accumulate(value: any) {
		this.accumulator = value;
	}

	onSave() {
		this.value = this.accumulator;
		this.customField.value = this.value;
		this.onChangeFn(this.value);
	}

	onClose() {

	}
}
