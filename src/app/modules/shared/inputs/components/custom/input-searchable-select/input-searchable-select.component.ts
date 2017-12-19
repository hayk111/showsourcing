import { Component, OnInit, EventEmitter, Output, Injector, forwardRef, Input, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR, NgControl, FormControl } from '@angular/forms';
import { AbstractInput } from '../../../abstract-input.class';

export interface SelectableItem {
	selected?: boolean;
	id: string;
	name: string;
	image?: string;
}

@Component({
	selector: 'input-searchable-select-app',
	templateUrl: './input-searchable-select.component.html',
	styleUrls: ['./input-searchable-select.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => InputSearchableSelectComponent),
			multi: true
		}
	]
})
export class InputSearchableSelectComponent extends AbstractInput {
	private _choices: Array<SelectableItem>;
	@Input() selected: SelectableItem;
	@Input() multi = false;
	@Output() update = new EventEmitter<string>();
	filteredChoices: Array<SelectableItem>;
	search = new FormControl('');

	panelVisible: boolean;

	constructor(protected inj: Injector) {
		super(inj);
	}

	onKeyUp(value) {
		this.filteredChoices = this.choices.filter( c => this.filterChoice(c.name, this.search.value));
	}

	private filterChoice(c, str) {
		if (!str) return true;
		return c.startsWith(str);
	}
	showPanel() {
		this.panelVisible = true;
	}

	closePanel() {
		this.panelVisible = false;
	}

	onUpdate(event) {
		this.update.emit(event);
	}

	@Input()
	set choices(v) {
		this.filteredChoices = v;
		this._choices = v;
	}

	get choices() {
		return this._choices;
	}
}
