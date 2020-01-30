import {
	Component, Input, Output,
	EventEmitter,
	OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ProductStatus, SupplierStatus } from '~core/erm';
import { Price, ProductVote, SupplierVote } from '~core/erm';
import { ERM } from '~core/erm';

type Vote = ProductVote | SupplierVote;

@Component({
	selector: 'search-autocomplete-item-content-app',
	templateUrl: './search-autocomplete-item-content.component.html',
	styleUrls: ['./search-autocomplete-item-content.component.scss']
})
export class SearchAutocompleteItemContentComponent implements OnInit {

	/** The main title */
	@Input() title: string;
	/** The sub title */
	@Input() subtitle: string;
	/** The price */
	@Input() price: Price;
	/** The vote */
	@Input() votes: Vote[];
	/** The status displayed into a tiny label */
	@Input() status: ProductStatus | SupplierStatus;
	/** The image url */
	@Input() image: string;
	@Input() type: string;
	@Input() category: string;
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

	erm = ERM;

	ngOnInit() {}

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
