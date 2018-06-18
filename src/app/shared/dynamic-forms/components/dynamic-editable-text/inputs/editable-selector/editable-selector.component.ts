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
	styleUrls: ['./editable-selector.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(EditableSelectorComponent)]
})
export class EditableSelectorComponent extends AbstractInput implements OnInit {

	@Input() isOpen: boolean;
	@Input() inlineLabel: string;
	@Input() customField: CustomField;
	@Output() opened = new EventEmitter();
	@Output() closed = new EventEmitter();
	@Output() change = new EventEmitter<Choice>();
	@ViewChild('editable') editable: EditableTextComponent;
	@ViewChild('selector') selector: SelectorConstComponent | SelectorEntityComponent;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
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
		this.onTouchedFn();
	}

	onChange() {
		this.onChangeFn(this.value);
		this.change.emit(this.value);
	}
}
