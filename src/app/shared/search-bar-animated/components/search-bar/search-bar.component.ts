import {
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnChanges,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AbstractInput, makeAccessorProvider } from '~shared/inputs';


@Component({
	selector: 'search-bar-app',
	templateUrl: './search-bar.component.html',
	styleUrls: ['./search-bar.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [makeAccessorProvider(SearchBarComponent)],
	host: {
		'(click)': 'onClick()',
	}
})
export class SearchBarComponent extends AbstractInput implements OnChanges, OnInit {
	focussed = false;
	@Input() inputFocus: boolean;
	@Input() hasIcon = true;
	@Input() placeHolder = 'Type to search';
	@Output() search = new EventEmitter<string>();
	private _searchSubject$ = new Subject();

	@ViewChild('inp') inputRef: ElementRef;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this._searchSubject$.pipe(
			debounceTime(400),
		).subscribe((search: string) => this.search.emit(search));
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
		this._searchSubject$.next(value);
	}

	onClick() {
		this.focussed = true;
	}
}
