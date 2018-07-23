import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

/**
 * Chiptag that can be either a tag or a category
 */
@Component({
	selector: 'smart-badge-app',
	templateUrl: './smart-badge.component.html',
	styleUrls: ['./smart-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SmartBadgeComponent implements OnInit {
	@Input() type: string;

	constructor() { }

	ngOnInit() {
	}

}
