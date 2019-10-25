import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Color } from '~utils';

@Component({
	selector: 'badge-page-app',
	templateUrl: './badge-page.component.html',
	styleUrls: ['./badge-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BadgePageComponent {
	colors = Object.values(Color);

	statuses = [
		{ step: 1, name: 'in progress', category: 'inProgress'},
		{ step: 2, name: 'validated', category: 'validated'},
		{ step: 3, name: 'refused', category: 'refused'}
	];
}
