import { ChangeDetectionStrategy, Component, Input, OnInit, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { tap, map, switchMap } from 'rxjs/operators';
import { api, Typename } from 'showsourcing-api-lib';
import { PropertyDescriptor, PropertyType } from '~core/erm3';
import _ from 'lodash';

@Component({
	selector: 'dynamic-editable-field-app',
	templateUrl: './dynamic-editable-field.component.html',
	styleUrls: ['./dynamic-editable-field.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DynamicEditableFieldComponent implements OnInit, OnChanges {
	@Input() descriptor: PropertyDescriptor;
	@Input() control: FormControl;

	selectorEntityId$ = new BehaviorSubject<string>('');
	selectorValue$ = new BehaviorSubject<string>('');

	type = PropertyType;
	initialValue;

	ngOnInit() {
		this.initialValue = this.control.value;
		this.selectorEntityId$.next(this.initialValue);

		this.selectorEntityId$
			.pipe(
				map((id) => this.getSelectorValue(id)),
				map(entity => entity.value || entity.name),
				tap(value => {
					this.selectorValue$.next(value);
				})
			).subscribe();
	}

	ngOnChanges(changes: SimpleChanges) {
		const { control } = changes;
		if (this.descriptor.definition.type === this.type.SELECTOR) {
			this.selectorEntityId$.next(control.currentValue.value);
		}
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

	getSelectorValue(id: string): any {
		if (id && api[this.typename]) {
			return api[this.typename].get(id);
		}

		return of('');
	}

	selectorUpdate(event) {
		this.selectorEntityId$.next(event[Object.keys(event)[0]]);
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
