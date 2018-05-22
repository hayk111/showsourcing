import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Project, Tag } from '~models';
import { EditableFieldValue } from './editable-field-value.interface';
import { InputDirective } from '~shared/inputs';
import { CustomSelector } from '~shared/selectors/utils/custom-selector.class';


@Component({
	selector: 'editable-field-app',
	templateUrl: './editable-field.component.html',
	styleUrls: ['./editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditableFieldComponent implements OnInit {
	// whether we can edit this field or not
	@Input() editable = true;
	@Input() value;
	@Input() type = 'text';
	@Input() label: string;
	// whether the label is placed above or inlined with the value
	@Input() labelPosition: 'top' | 'inline' = 'top';
	@Input() isRightAligned = false;
	// the entity the editable field targets. This is used to display additional things instead of just the value
	// for example for the price we also display the currency
	@Input() entity: any;
	@Input() isCompactInline = false;
	// update will return the new value
	@Output() update = new EventEmitter<any>();
	// when select multiple we can create, add and remove
	@Output() itemCreate = new EventEmitter<EditableFieldValue>();
	@Output() itemAdded = new EventEmitter<EditableFieldValue>();
	@Output() itemRemoved = new EventEmitter<EditableFieldValue>();
	// when an editable field should be a selector we need it to open it on click
	@ViewChild(CustomSelector) selector: CustomSelector<any>;
	// same for inputs
	@ViewChild(InputDirective) input: InputDirective;
	editMode = false;
	// accumulator to save the new value, we will send an update even not on change but when the button save is clicked
	// Therefor we need an accumulator to save the value before clicking the save button since we don't yet know which input
	// is being used
	accumulator: string | number;

	constructor(private cd: ChangeDetectorRef) { }

	ngOnInit() { }

	openEditMode() {
		if (!this.editable)
			return;

		this.editMode = true;
		// we put the current value in case we canceled earlier and we still got the previously cancelled value in the accumulator
		this.accumulator = this.value;

		// if the type is a selector then we need to open it when the editmode is opening
		// TODO: remove this by using editable-text (which was created after this component)
		setTimeout(() => {
			if (this.selector)
				this.selector.open();
			if (this.input)
				this.input.focus();
		}, 0);

		// since we can open the editmode from anywhere we need to check for cd
		this.cd.markForCheck();
	}


	closeEditMode() {
		this.editMode = false;
	}

	/** save the currently pending value (it has not been saved yet) in an accumulator */
	updateValue(value: string) {
		this.accumulator = value;
	}

	/** when the user decides to save the value either by clicking enter or by clicking the save button */
	onSave() {
		// we save when we have an input so we can save when clicking outside
		this.update.emit(this.accumulator);
		this.closeEditMode();
	}


	getSingular(type: string) {
		if (type === 'category')
			return 'category';
		// removing the 's' at the end of a type
		else
			return type.substr(0, type.length - 1);
	}
}
