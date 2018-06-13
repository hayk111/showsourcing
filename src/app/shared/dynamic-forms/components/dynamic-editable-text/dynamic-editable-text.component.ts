import { Component, OnInit, ChangeDetectionStrategy, Input, ChangeDetectorRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { FormGroup } from '@angular/forms';
import { AbstractInput, makeAccessorProvider, InputDirective } from '~shared/inputs';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { Choice } from '~shared/selectors/utils/choice.interface';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { EditableTextComponent } from '~shared/editable-field';
import { DEFAULT_IMG, DEFAULT_SUPPLIER_IMG, DEFAULT_USER_IMG, DEFAULT_SUPPLIER_ICON } from '~utils';
import { ImagePipe } from '~shared/utils/pipes/image.pipe';

@Component({
	selector: 'dynamic-editable-text-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)]
})
export class DynamicEditableTextComponent extends AbstractInput implements OnInit {
	@Input() customField: CustomField;
	@Output() open = new EventEmitter<null>();
	@Output() close = new EventEmitter<null>();
	@ViewChild(InputDirective) input: InputDirective;
	@ViewChild('selector') selector: SelectorEntityComponent | SelectorConstComponent;
	@ViewChild('editable') editable: EditableTextComponent;
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

	accumulateNested(propName: string, value: any) {
		this.accumulator = {
			...this.value,
			[propName]: value
		};
	}

	onSave() {
		this.value = this.accumulator;
		this.customField.value = this.value;
		this.onChangeFn(this.value);
		this.onClose();
	}

	onOpen() {
		/** let's focus on the target input */
		// using setTimout because the element isn't rendered yet
		if (this.input)
			this.input.focus();
		if (this.selector)
			this.selector.open();
		this.open.emit();
	}

	onClose() {
		this.close.emit();
	}

	onSelectorChange() {
		if (!this.customField.multiple) {
			this.editable.close();
		}
		this.onChange();
	}

	onChange() {
		this.customField.value = this.value;
		this.onChangeFn(this.value);
	}

	/** check if a value is empty */
	isEmpty(value: any) {
		if (!value)
			return true;
		if (Array.isArray(value) && value.length === 0)
			return true;
	}

	getIcon(target: any, type: string) {

		if (target) {
			const pipe = new ImagePipe();
			return pipe.transform(target, ['s']);
		}

		switch (type) {
			case 'supplier':
				return DEFAULT_SUPPLIER_ICON;
			case 'user':
				return DEFAULT_USER_IMG;
			default:
				return '';
		}
	}
}
