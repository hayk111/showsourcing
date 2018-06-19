import {
	Component, OnInit, Input, EventEmitter,
	Output, ChangeDetectionStrategy, HostListener
} from '@angular/core';

@Component({
	selector: 'select-app',
	templateUrl: './select.component.html',
	styleUrls: ['./select.component.scss'],
	host: {
		class: 'z-2'
	}
})
export class SelectComponent implements OnInit {
	@Input() label: string;
	@Input() values: any[];
	@Output() select = new EventEmitter<string>();

	opened = false;

	constructor() { }

	ngOnInit() { }

	onToggleOpen(event, i, display = true) {
		this.opened = !this.opened;
		event.stopPropagation();
	}

	@HostListener('window:click', [ 'event' ])
	onClickWindow(event) {
		if (this.opened) {
			this.opened = !this.opened;
		}
	}

}
