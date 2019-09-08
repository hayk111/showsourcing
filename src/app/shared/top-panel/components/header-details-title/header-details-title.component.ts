import { Component, Input } from '@angular/core';

@Component({
	selector: 'header-details-title-app',
	templateUrl: './header-details-title.component.html',
	styleUrls: ['./header-details-title.component.scss'],
})
export class HeaderDetailsTitleComponent {
	/** title displayed */
	@Input() title: string;
}
