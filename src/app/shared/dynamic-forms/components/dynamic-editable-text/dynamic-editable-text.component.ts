import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { CustomField } from '~shared/dynamic-forms';
import { EditableTextComponent } from '~shared/editable-field';
import { AbstractInput, InputDirective, makeAccessorProvider } from '~shared/inputs';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { ImagePipe } from '~shared/utils/pipes/image.pipe';
import { DEFAULT_IMG, DEFAULT_SUPPLIER_ICON, DEFAULT_USER_ICON, DEFAULT_EVENT_ICON, uuid } from '~utils';

@Component({
	selector: 'dynamic-editable-text-app',
	templateUrl: './dynamic-editable-text.component.html',
	styleUrls: ['./dynamic-editable-text.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(DynamicEditableTextComponent)]
})
export class DynamicEditableTextComponent extends AbstractInput implements OnInit {
	@Input() customField: CustomField;
	/** whether the input should be on the same line as the label */
	@Input() inlineLabel: boolean;
	/** when the editable field opens */
	@Output() open = new EventEmitter<null>();
	/** when the editable field closes */
	@Output() close = new EventEmitter<null>();
	/** input ref (if any), used to focus when opening the field */
	@ViewChild(InputDirective) input: InputDirective;
	/** selector ref (if any), used to focus when opening the field */
	@ViewChild('selector') selector: SelectorEntityComponent | SelectorConstComponent;
	/** editable field ref, used to close it programmatically */
	@ViewChild('editable') editable: EditableTextComponent;
	/** accumulates what the user types in input and if he doesn't press cancel we save it */
	accumulator: string;
	/** whether the editable is open */
	isOpen = false;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		// saving the starting value in the accumulator so
		// if we do a save without typing anything the field won't be undefined
		this.accumulator = this.customField.value;
	}

	/** saves the value because an user might cancel */
	accumulate(value: any) {
		this.accumulator = value;
	}

	/** same as accumulate but the value is an object and we are changing only one field */
	accumulateNested(propName: string, value: any) {
		this.accumulator = {
			// we need to put an id for new object, if the object already exist then ...this.value will override it
			id: uuid(),
			...this.value,
			[propName]: value
		};
	}

	/** saving the value */
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
		this.isOpen = true;
	}

	onClose() {
		this.close.emit();
		this.isOpen = false;
	}

	/** when the selector has changed, we don't use the accumulator */
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

}
