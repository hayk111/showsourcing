import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { AppImage } from '~models';
import { Location } from '@angular/common';

@Component({
	selector: 'top-panel-details-app',
	templateUrl: './top-panel-details.component.html',
	styleUrls: ['./top-panel-details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopPanelDetailsComponent implements OnInit {
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

	@Output() delete = new EventEmitter<null>();

	constructor(
		private location: Location
	) { }

	ngOnInit() {
	}

	goBack() {
		this.location.back();
	}

	toDisplayString(nav: string) {
		return nav.toLowerCase().replace(/-/g, ' ');
	}
}
