import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	ViewChild,
} from '@angular/core';
import Fuse from 'fuse.js/dist/fuse.esm.js';
import { Subject, ReplaySubject, BehaviorSubject } from 'rxjs';

@Component({
	selector: 'selector-default-app',
	templateUrl: './selector-default.component.html',
	styleUrls: ['./selector-default.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorDefaultComponent implements OnInit {
	@ViewChild('searchInput', { read: ElementRef }) searchInput: any;
	// display the search bar
	@Input() isOpen = false;
	@Input() searchable = true;
	@Input() useFuse = true;
	@Input() itemKey = '';
	private _items;
	displayedItems$ = new BehaviorSubject([{ label: 'test' }]);
	@Input() set items(items) {
		if (this.useFuse) {
			this._fuseOptions.keys = [this.itemKey];
			this._fuse = new Fuse(items, this._fuseOptions);
		}
		this._items = items.map(item => ({item}));
		this.displayedItems$.next(this._items);
	}
	@Input() minWidth = 300;
	@Input() textTrigger = 'trigger';
	@Input() textHint = 'hint';
	@Input() textLabel = 'label';
	@Input() textPlaceholder = 'placeholder';

	@Output() selected = new EventEmitter();
	@Output() searched = new EventEmitter();

	private _fuse: Fuse;
	private _fuseOptions: any = {
		shouldSort: true,
		threshold: 0.3, // 0 = full match
		location: 0,
		distance: 100,
		minMatchCharLength: 1,
	};

	constructor() {}

	ngOnInit(): void {}

	search(searchedText: string) {
		this.searched.emit(searchedText);
		if (this.useFuse) {
			const searchedItems = searchedText
				? this._fuse.search(searchedText)
				: this._items;
			this.displayedItems$.next(searchedItems);
		}
	}
	focusInput() {
		this.isOpen = true;
		setTimeout(() => {
			this.searchInput.nativeElement.focus();
		}, 1);
	}
	emitSelected(item) {
		this.selected.emit(item);
		this.isOpen = false;
	}
}
