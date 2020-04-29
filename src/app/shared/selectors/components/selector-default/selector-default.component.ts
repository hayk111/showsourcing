import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, AfterViewInit, ViewChildren, ElementRef } from '@angular/core';
import { InputDirective } from '~shared/inputs';

@Component({
	selector: 'selector-default-app',
	templateUrl: './selector-default.component.html',
	styleUrls: ['./selector-default.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorDefaultComponent implements OnInit {
	@ViewChild('searchInput', {read: ElementRef}) searchInput: any;
	// display the search bar
	@Input() searchable = true;

	constructor() {}

	ngOnInit(): void {
	}

	select(value) {
		console.log(value);
	}

	search(event) {
		console.log(event.target.value);
	}
	focusInput() {
		console.log(this.searchInput.nativeElement);
		setTimeout(() => {
			this.searchInput.nativeElement.focus();
		}, 1);
	}
}
