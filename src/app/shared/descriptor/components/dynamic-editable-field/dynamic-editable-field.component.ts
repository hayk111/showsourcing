import { ChangeDetectionStrategy, Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { api, Typename } from 'showsourcing-api-lib';
import { PropertyDescriptor, PropertyType } from '~core/erm3';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent implements OnInit {
	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;

	selectorValue$: Observable<string>;

	type = PropertyType;
	initialValue;

	ngOnInit() {
		this.initialValue = this.control.value;
		this.selectorValue$ = this.getSelectorValue(this.initialValue).pipe(map(entity => entity.value || entity.name));
	}

	onSave() {
		this.initialValue = this.control.value;
	}

	reset() {
		this.control.reset(this.initialValue);
	}

	toggleValue() {
		if (!this.descriptor.readonly) {
			this.control.setValue(!this.control.value);
		}
	}

	getSelectorValue(id: string): Observable<any> {
		console.log('DynamicEditableFieldComponent -> id', id);
		if (id) {
			return api[this.typename].get(id);
		}

		return of('');
	}

	selectorUpdate(event) {
		console.log('selectorUpdate:::', event);
	}

	get typename(): string {
		if (this.descriptor.definition.selectorSettings) {
			const type = this.descriptor.definition.selectorSettings.type.toLowerCase();
			return type === 'custom' ? 'PropertyOption' : this.capitalize(type);
		}

		return '';
	}

	get customType(): string {
		if (this.descriptor.definition.selectorSettings) {
			const customType = this.descriptor.definition.selectorSettings.propertyOptionType.toLowerCase();
			return this.capitalize(customType);
		}

		return '';
	}

	private capitalize(str: string): string {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}
}
