import { Component, OnInit, Input, EventEmitter, Output, Injector } from '@angular/core';
import { AbstractInput } from '../../../../abstract-input.class';
import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';

export interface SelectableItem {
	selected?: boolean;
	id: string;
	name: string;
	image?: string;
}

@Component({
	selector: 'input-select-one-app',
	templateUrl: './input-select-one.component.html',
	styleUrls: ['./input-select-one.component.scss']
})
export class InputSelectOneComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	panelVisible = false;
	searchString;

	constructor(protected inj: Injector, protected cd: ChangeDetectorRef) {
		super(inj, cd);
	}

	ngOnInit() {
	}

	onUpdate(value) {
		this.onChange(value);
	}

	showPanel() {
		this.panelVisible = true;
	}

	closePanel(event: MouseEvent) {
		this.panelVisible = false;
		event.stopPropagation();
	}

	get filteredChoices(): Array<SelectableItem> {
		if (!this.searchString)
			return this.choices;
		return this.choices.filter(c => c.name.startsWith(this.searchString));
	}

	getNameFromValue(id: string) {
		const r = this.choices.find(c => c.id === id);
		return r ? r.name : '';
	}
}
