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
	Renderer2,
	ViewChild
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
		'[class.short]': 'searchType === "short"',
		'[class.focus]': 'focussed'
	}
})
export class SearchBarComponent extends AbstractInput implements OnChanges, OnInit {
	focussed = false;
	@Input() inputFocus: boolean;
	@Input() hasIcon = true;
	@Input() placeHolder = 'Search';
	@Input() searchType: 'short' | 'long' = 'long';
	@Output() search = new EventEmitter<string>();
	private _searchSubject$ = new Subject();

	@ViewChild('inp', { static: true }) inputRef: ElementRef;

	constructor(protected cd: ChangeDetectorRef, private renderer: Renderer2) {
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
		console.log('SearchBarComponent -> onChange -> value0000', value);
		this.onChangeFn(value);
		this._searchSubject$.next(value);
	}

	reset() {
		this.onChange('');
		this.renderer.setProperty(this.inputRef.nativeElement, 'value', '');
	}

	onClick() {
		this.focussed = true;
	}
}
