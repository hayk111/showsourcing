import {
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	QueryList,
	ViewChildren,
	AfterViewInit,
	OnInit,
} from '@angular/core';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs/components-directives/abstract-input.class';

@Component({
	selector: 'radio-app',
	templateUrl: './radio.component.html',
	styleUrls: ['./radio.component.scss'],
	providers: [makeAccessorProvider(RadioComponent)],
})
export class RadioComponent extends AbstractInput {

	@Input() isVeritical = false;
	@Input() disabled = false;
	/** list of possible values and labels */
	@Input() choices: { label: string, value: boolean }[];

	pick(value: any) {
		this.value = value;
		this.onChangeFn(value);
		this.onTouchedFn(value);
	}

}
