import {
	Component, Input, Output,
	EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'search-autocomplete-item-content-app',
	templateUrl: './search-autocomplete-item-content.component.html',
	styleUrls: ['./search-autocomplete-item-content.component.scss']
})
export class SearchAutocompleteItemContentComponent {

	/** The main title */
	@Input() title: string;
	/** The sub title */
	@Input() subtitle: string;
	/** The status displayed into a tiny label */
	@Input() status: string;
	/** The image url */
	@Input() image: string;
	/** The icon name */
	@Input() icon: string;
	/** Displays the checkbox */
	@Input() selectable = true;
	/** The checkbox checked or not */
	@Input() checked = true;
	/** The link to display the element */
	@Input() link: string;
	@Output() check = new EventEmitter<null>();
	@Output() uncheck = new EventEmitter<null>();

	constructor(private router: Router) {}

	displayItem() {
		if (this.selectable) {
			this.toggleCheck();
		} else if (this.link) {
			this.router.navigate([ this.link ]);
		}
	}

	toggleCheck() {
		this.checked = !this.checked;
		if (this.checked) {
			this.onCheck();
		} else {
			this.onUncheck();
		}
	}

	onCheck() {
		this.check.emit();
	}

	onUncheck() {
		this.uncheck.emit();
	}
}
