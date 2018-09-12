import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Input, Output, EventEmitter, ViewChild } from '@angular/core';
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
	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();
	@Output() change = new EventEmitter<null>();
	@Output() blur = new EventEmitter<null>();
	@ViewChild('editable') editable: EditableTextComponent;
	@ViewChild('selector') selector: any;
	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
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

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit();
	}

	onOpen() {
		setTimeout(_ => this.selector.open());
	}

	onBlur() {
		this.onTouchedFn();
		this.blur.emit();
	}

	get labelName() {
		return this.customField.metadata.labelName || 'name';
	}
}
