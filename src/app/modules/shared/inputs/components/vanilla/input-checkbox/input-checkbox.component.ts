import { Component, OnInit, Input, Output, EventEmitter, Injector, ChangeDetectionStrategy } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import Log from '../../../../../../utils/logger/log.class';
import { FormControl } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';


export interface SelectableItem {
	id: string;
	name: string;
	checked?: boolean;
	count?: number;
}


@Component({
	selector: 'input-checkbox-app',
	templateUrl: './input-checkbox.component.html',
	styleUrls: ['./input-checkbox.component.scss'],
	providers: [ makeAccessorProvider(InputCheckboxComponent) ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCheckboxComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	@Input() formControl: FormControl;
	@Output() update = new EventEmitter<any>();
	@Output() itemAdded = new EventEmitter<any>();
	@Output() itemRemoved = new EventEmitter<any>();

	constructor() {
		super();
	}

	ngOnInit() {

	}

	// we either remove or add the item to value and pass the change
	preChange(event: Event, item: SelectableItem) {
		const checked = (event.target as any).checked;
		if (checked) {
			this.value = this.value.concat(item.id);
			this.itemAdded.emit(item);
		} else {
			const index = (this.value as any[]).findIndex(val => val === item.id);
			// chging ref for formcontrol update
			this.value = [...this.value];
			this.value.splice(index, 1);
			this.itemRemoved.emit(item);
		}
		this.onChange(this.value);
	}

	checked(v) {
		return this.value.includes(v);
	}
}
