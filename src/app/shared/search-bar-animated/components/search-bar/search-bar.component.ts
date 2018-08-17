import {
	ChangeDetectionStrategy, Component, ChangeDetectorRef,
	Input, Output, EventEmitter, ViewChild, ElementRef,
	OnChanges
} from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';


@Component({
	selector: 'search-bar-app',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SearchBarComponent)],
	host: {
		'(click)': 'onClick()'
	}
})
export class SearchBarComponent extends AbstractInput implements OnChanges {
	focussed = false;
	@Input() inputFocus: boolean;
	@Output() search = new EventEmitter<string>();

	@ViewChild('inp') inputRef: ElementRef;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnChanges(changes) {
		if (changes.inputFocus && changes.inputFocus.currentValue != null &&
				changes.inputFocus.currentValue !== undefined) {
			const inputFocus = changes.inputFocus.currentValue;
			if (inputFocus) {
				this.inputRef.nativeElement.focus();
			} else {
				this.inputRef.nativeElement.blur();
			}
		}
	}

	onBlur() {
		this.onTouchedFn();
		this.focussed = false;
	}

	onChange(value: string) {
		this.onChangeFn(value);
		this.search.emit(value);
	}

	onClick() {
		this.focussed = true;
	}
}
