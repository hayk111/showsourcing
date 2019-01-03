import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AppImage, Product, Supplier, User } from '~models';
import { Location } from '@angular/common';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'top-panel-details-app',
	templateUrl: './top-panel-details.component.html',
	styleUrls: ['./top-panel-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-6'
	}
})
export class TopPanelDetailsComponent extends TrackingComponent implements OnInit {
	/** logo displayed */
	@Input() logo: AppImage;
	/** sometimes we use logos with alpha channels where we want to have a gradient background */
	@Input() logoPrimaryColor: string;
	@Input() logoSecondaryColor: string;
	/** title displayed */
	@Input() title: string;
	/** on some pages (at the time of writing this) we have navigation links in the top panel details */
	@Input() links: string[];
	/** has default options */
	@Input() hasOptions = false;
	@Input() hasAssignee = true;
	@Input() user: User;

	@Input() data: Supplier | Product;

	@Output() delete = new EventEmitter<null>();
	@Output() export = new EventEmitter<Supplier | Product>();
	@Output() favorited = new EventEmitter<Supplier | Product>();
	@Output() unfavorited = new EventEmitter<Supplier | Product>();
	@Output() changeUser = new EventEmitter<Supplier | Product>();

	constructor(
		private location: Location
	) {
		super();
	}

	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

	toDisplayString(nav: string) {
		return nav.toLowerCase().replace(/-/g, ' ');
	}
}
