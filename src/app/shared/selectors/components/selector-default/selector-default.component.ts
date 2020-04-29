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

@Component({
	selector: 'selector-default-app',
	templateUrl: './selector-default.component.html',
	styleUrls: ['./selector-default.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorDefaultComponent implements OnInit {
	@ViewChild('searchInput', { read: ElementRef }) searchInput: any;
	// display the search bar
	@Input() isOpen = true;
	@Input() searchable = true;
	@Input() items = [];
	@Input() itemKey = '';
	@Input() useFuse = true;
	@Output() selected = new EventEmitter();
	@Output() searched = new EventEmitter();

	constructor() {}

	ngOnInit(): void {}

	select(value) {
		console.log(value);
	}

	search(event) {
		this.searched.emit(event);
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
