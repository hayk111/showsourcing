import { Component, OnInit, Injector, Input, EventEmitter, Output } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { SelectableItem } from '../selectable-item.interface';
import { AbstractInput, makeAccessorProvider } from '../../../inputs/abstract-input.class';
import Log from '../../../../../utils/logger/log.class';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'input-select-multi-app',
	templateUrl: './input-select-multi.component.html',
	styleUrls: ['./input-select-multi.component.scss'],
	providers: [ makeAccessorProvider(InputSelectMultiComponent) ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectMultiComponent extends AbstractInput {

	filteredChoices: Array<SelectableItem>;
	panelVisible = false;
	@Output() itemAdded = new EventEmitter<SelectableItem>();
	@Output() itemRemoved = new EventEmitter<SelectableItem>();
	private _choices: Array<SelectableItem>;

	constructor() {
		super();
		this.value = [];
	}

	onSearch(str) {
		Log.debug('[InputSelectMultiComponent] searching in choices');
		if (!str)
			this.filteredChoices = this._choices;
		this.filteredChoices = this._choices.filter(c => c.name.startsWith(str));
	}

	onUpdate(value) {
		Log.debug('[InputSelectMultiComponent] onUpdate');
		this.onChange(value);
	}

	showPanel() {
		Log.debug('[InputSelectMultiComponent] showing panel');
		this.panelVisible = true;
	}

	closePanel(event: MouseEvent) {
		Log.debug('[InputSelectMultiComponent] closing panel');
		this.panelVisible = false;
		event.stopPropagation();
	}

	check(choice: SelectableItem) {
		return this.value ? this.value.includes(choice.id) : false;
	}

	@Input()
	set choices(v: Array<SelectableItem>) {
		this.filteredChoices = v;
		this._choices = v;
	}

	get choices() {
		return this._choices;
	}

}
