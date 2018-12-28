import {
	Component, Input, Output,
	EventEmitter
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductStatus, SupplierStatus } from '~core/models';

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
	@Input() status: ProductStatus | SupplierStatus;
	/** The image url */
	@Input() image: string;
	@Input() type: string;
	/** The icon name */
	@Input() icon: string;
	/** Displays the checkbox */
	@Input() selectable = true;
	/** The checkbox checked or not */
	@Input() checked = true;
	/** The link to display the element */
	@Input() link: string;
	/** if it is a special class icon for adding */
	@Input() adding = false;
	@Output() check = new EventEmitter<null>();
	@Output() uncheck = new EventEmitter<null>();
	/** The corresponding item was displayed. */
	@Output() itemDisplayed = new EventEmitter<null>();

	constructor(private router: Router) { }

	displayItem() {
		if (this.selectable) {
			this.toggleCheck();
		} else if (this.link) {
			this.itemDisplayed.emit();
			this.router.navigate([this.link]);
		} else
			this.itemDisplayed.emit();
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
