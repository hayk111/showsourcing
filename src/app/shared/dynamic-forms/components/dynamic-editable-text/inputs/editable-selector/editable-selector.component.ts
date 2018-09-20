import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild, TemplateRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';
import { CustomField } from '~shared/dynamic-forms';
import { SelectorConstComponent } from '~shared/selectors/components/selector-const/selector-const.component';
import { SelectorEntityComponent } from '~shared/selectors/components/selector-entity/selector-entity.component';
import { EditableTextComponent } from '~shared/editable-field';
import { Choice } from '~shared/selectors/utils/choice.interface';

@Component({
	selector: 'editable-selector-app',
	templateUrl: './editable-selector.component.html',
	styleUrls: ['./editable-selector.component.scss', '../../common-styles.scss'],
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
	@Input() customField: CustomField;
	@Input() closeOnOutsideClick: boolean;
	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();
	@Output() change = new EventEmitter<null>();
	@Output() blur = new EventEmitter<null>();
	@ViewChild('editable') editable: EditableTextComponent;
	@ViewChild('selector') selector: any;
	@ViewChild('oneValueLabel') oneLabel: TemplateRef<any>;
	@ViewChild('multipleValuesLabel') manyLabel: TemplateRef<any>;


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
	onSelectorChange() {
		if (!this.customField.multiple) {
			this.editable.close();
		}
		this.onChange();
	}

	preventPropagation(event: MouseEvent) {
		event.stopPropagation();
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit();
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
