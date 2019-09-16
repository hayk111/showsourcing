import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Color } from '~utils';

@Component({
	selector: 'app-badge-lib-page',
	templateUrl: './badge-lib-page.component.html',
	styleUrls: ['./badge-lib-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgeLibPageComponent {
	colors = Object.values(Color);

	statuses = [
		{ step: 1, name: 'in progress', category: 'inProgress'},
		{ step: 2, name: 'validated', category: 'validated'},
		{ step: 3, name: 'refused', category: 'refused'}
	];
}
