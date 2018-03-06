import {
	Component,
	OnInit,
	Input,
	Injector,
	Output,
	EventEmitter,
	ChangeDetectorRef,
} from '@angular/core';
import {
	AbstractInput,
	makeAccessorProvider,
} from '../../abstract-input.class';
import { SelectableItem } from '../input-checkbox-list/input-checkbox-list.component';
import { Log } from '~utils/index';
import { ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'input-radio-app',
	templateUrl: './input-radio.component.html',
	styleUrls: ['./input-radio.component.scss'],
	providers: [makeAccessorProvider(InputRadioComponent)],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputRadioComponent extends AbstractInput implements OnInit {
	@Input() choices: Array<SelectableItem>;
	@Input() formControl: string | any;

	constructor() {
		super();
	}

	ngOnInit() {}

	onChange(c) {
		Log.debug('[InputRadioComponent] on change');
		super.onChange(c.id);
	}

	check(c) {
		Log.debug('[InputRadioComponent] check');
		return c.id === this.value;
	}

	trackByFn(index, c: SelectableItem) {
		return c.id;
	}
}
