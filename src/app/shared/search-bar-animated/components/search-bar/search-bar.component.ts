import {
	ChangeDetectionStrategy, Component, ChangeDetectorRef,
	Input, Output, EventEmitter, ViewChild, ElementRef,
	OnChanges,
	OnInit
} from '@angular/core';
import { makeAccessorProvider, AbstractInput } from '~shared/inputs';
import { Subject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';


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
export class SearchBarComponent extends AbstractInput implements OnChanges, OnInit {
	focussed = false;
	@Input() inputFocus: boolean;
	@Output() search = new EventEmitter<string>();
	private _searchSubject$ = new Subject();

	@ViewChild('inp') inputRef: ElementRef;

	constructor(protected cd: ChangeDetectorRef) {
		super(cd);
	}

	ngOnInit() {
		this._searchSubject$.pipe(
			debounceTime(400),
		).subscribe((search: string) => this.search.emit(search))
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
