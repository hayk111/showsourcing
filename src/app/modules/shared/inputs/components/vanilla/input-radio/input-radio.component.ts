import { Component, OnInit, Input, Injector, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '../../../abstract-input.class';
import { SelectableItem } from '../input-checkbox/input-checkbox.component';
import Log from '../../../../../../utils/logger/log.class';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'input-radio-app',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss'],
	providers: [ makeAccessorProvider(InputRadioComponent) ],
	changeDetection: ChangeDetectionStrategy.OnPush

})
export class InputRadioComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	@Input() formControl: string | any;

	constructor(protected inj: Injector, protected cd: ChangeDetectorRef) {
		super(inj, cd);
	}

	ngOnInit() {
	}


	check(c) {
		Log.debug('check');
		return c.id === this.value;
	}

}
