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
	protected static NEXT_UID = 0;

	@Input() isVeritical = false;
	@Input() disabled = false;
	/** list of possible values and labels */
	@Input() items: { label: string, value: boolean }[];

	/** id of element, if not specified it will generate automtically */
	@Input()
	get id(): string { return this._id; }
	set id(value: string) { this._id = value; }
	protected _id: string = 'radio-' + RadioComponent.NEXT_UID++;

	@Output() change = new EventEmitter();
	@Output() update = new EventEmitter<boolean>();
	@Output() select = new EventEmitter<null>();

	@ViewChildren('inp') inps: QueryList<ElementRef>;

	getId(index) {
		return this._id + '-' + index;
	}


}
