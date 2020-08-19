import { ChangeDetectionStrategy, Component, Input, OnInit, Output, SimpleChanges, OnChanges, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { api, Typename } from 'showsourcing-api-lib';
import { PropertyDescriptor, PropertyType } from '~core/erm3';
import * as _ from 'lodash';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent implements OnInit {
	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;

	@Output() save = new EventEmitter<undefined>();

	type = PropertyType;
	initialValue;

	ngOnInit() {
		this.initialValue = this.control ? this.control.value : '';
	}

	onSave() {
		this.initialValue = this.control.value;
		this.save.emit();
	}

	reset() {
		this.control.reset(this.initialValue);
	}

	toggleValue() {
		if (!this.descriptor.readonly) {
			this.control.setValue(!this.control.value);
		}
	}

	getSelectorValue(id: string): any {
		if (id && api[this.typename]) {
			return api[this.typename].get$(id).data$;
		}

		return of('');
	}

	selectorUpdate() {
		this.save.emit();
	}

	canCreate(): boolean {
		return ['category', 'supplier'].includes(this.descriptor.definition.label.toLowerCase());
	}

	get typename(): string {
		if (this.descriptor.definition.selectorSettings) {
			const type = this.descriptor.definition.selectorSettings.type.toLowerCase();
			return type === 'custom' ? 'PropertyOption' : _.capitalize(type);
		}

		return '';
	}

	get customType(): string {
		if (this.descriptor.definition.selectorSettings) {
			return this.descriptor.definition.selectorSettings.propertyOptionType.toLowerCase();
		}

		return '';
	}
}
