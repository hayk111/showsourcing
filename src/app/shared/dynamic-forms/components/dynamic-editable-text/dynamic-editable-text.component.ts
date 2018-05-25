import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AbstractInput, makeAccessorProvider, InputDirective } from '~shared/inputs';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { Choice } from '~shared/selectors/utils/choice.interface';

@Component({
	selector: 'dynamic-editable-text-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)]
})
export class DynamicEditableTextComponent extends AbstractInput implements OnInit {
	@Input() customField: CustomField;
	@ViewChild(InputDirective) input: InputDirective;
	@ViewChild(SelectorEntityComponent) selector: SelectorEntityComponent;
	accumulator: string;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this.accumulator = this.customField.value;
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

	onOpen() {
		/** let's focus on the target input */
		// using setTimout because the element isn't rendered yet
		if (this.input)
			this.input.focus();
		if (this.selector)
			this.selector.open();
	}

	onSelect(choice: Choice) {
		this.onChangeFn(this.value);
	}

	onUnselect(choice) {
		this.onChangeFn(this.value);
	}

	onClose() {

	}

	/** check if a value is empty */
	isEmpty(value: any) {
		if (!value)
			return true;
		if (Array.isArray(value) && value.length === 0)
			return true;
	}
}
