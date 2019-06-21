import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	EventEmitter,
	Input,
	Output,
	TemplateRef,
	ViewChild,
} from '@angular/core';
import { DynamicField } from '~shared/dynamic-forms/models';
import { EditableTextComponent } from '~shared/editable-field';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';

@Component({
	selector: 'editable-selector-app',
	templateUrl: './editable-selector.component.html',
	styleUrls: ['./editable-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditableSelectorComponent)],
	host: {
		'[class.oneLine]': 'inlineLabel',
		'[class.twoLine]': '!inlineLabel'
	}
})
export class EditableSelectorComponent extends AbstractInput {

	@Input() isOpen: boolean;
	@Input() isShowLabel: true;
	@Input() inlineLabel: string;
	@Input() customField: DynamicField;
	@Input() closeOnOutsideClick: boolean;
	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();
	@Output() change = new EventEmitter<any>();
	@Output() blur = new EventEmitter<null>();
	@ViewChild('editable', { static: false }) editable: EditableTextComponent;
	@ViewChild('selector', { static: false }) selector: any;
	@ViewChild('oneValueLabel', { static: true }) oneLabel: TemplateRef<any>;
	@ViewChild('multipleValuesLabel', { static: true }) manyLabel: TemplateRef<any>;


	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	getLabelTemplate() {
		return this.customField.multiple ? this.manyLabel : this.oneLabel;
	}

	/** check if a value is empty */
	isEmpty(value: any) {
		if (!value)
			return true;
		if (Array.isArray(value) && value.length === 0)
			return true;
	}

	/** when the selector has changed, we don't use the accumulator */
	onSelectorChange(item?) {
		this.value = item;
		if (!this.customField.multiple) {
			this.editable.close();
		}
		this.onChange(item);
	}

	preventPropagation(event: MouseEvent) {
		event.stopPropagation();
	}

	onChange(item?) {
		this.onChangeFn(this.value);
		this.change.emit(item);
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
