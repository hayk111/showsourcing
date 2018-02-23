import { Component, OnInit, Input, EventEmitter, Output, Injector } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '../../../inputs/abstract-input.class';
import { Log } from '@utils/index';
import { SelectableItem } from '../selectable-item.interface';


@Component({
	selector: 'input-select-one-app',
	templateUrl: './input-select-one.component.html',
	styleUrls: ['./input-select-one.component.scss'],
	providers: [ makeAccessorProvider(InputSelectOneComponent) ],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputSelectOneComponent extends AbstractInput implements OnInit {
	// For perf gains we could use EntityState instead of a SelectableItem here.
	filteredChoices: Array<SelectableItem>;
	@Input() panelVisible = false;
	private lastValue;
	private lastName;
	private _choices: Array<SelectableItem>;

	constructor() {
		super();
	}

	ngOnInit() {
	}

	onSearch(str) {
		Log.debug('[InputSelectOneComponent] searching in choices');
		if (!str)
			this.filteredChoices = this._choices;
		this.filteredChoices = this._choices.filter(c => c.name.startsWith(str));
	}

	onUpdate(value) {
		Log.debug('[InputSelectOneComponent] onUpdate', value);
		this.onChange(value);
	}

	showPanel() {
		Log.debug('[InputSelectOneComponent] showing panel');
		this.panelVisible = true;
	}

	closePanel(event: MouseEvent) {
		Log.debug('[InputSelectOneComponent] closing panel');
		this.panelVisible = false;
		event.stopPropagation();
	}

	// this fn is a bit more complicated than it should because it could potentially
	// run more than once and with big arrays that could kill perfs
	get name() {
		Log.debug('[InputSelectOneComponent] getting name', this.value, this.lastValue);
		if (! this.value)
			return '';

		if (this.lastValue === this.value)
			return this.lastName;

		this.lastValue = this.value;
		const r = this._choices.find(c => c.id === this.value);
		const name = r ? r.name : '';
		this.lastName = name;
		return name;
	}

	@Input()
	set choices(v: Array<SelectableItem>) {
		this.filteredChoices = v;
		this._choices = v;
	}
}
