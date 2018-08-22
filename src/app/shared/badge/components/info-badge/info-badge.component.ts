import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';

@Component({
	selector: 'info-badge-app',
	templateUrl: './info-badge.component.html',
	styleUrls: ['./info-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBadgeComponent implements OnInit {

	@Input() icon: 'category' | 'tag' | 'project' = 'category';

	constructor() { }

	ngOnInit() {
	}

	get getType() {
		let type = 'secondary';
		if (this.icon === 'category')
			type = 'accent';
		return type;
	}

	get iconName() {
		let name = '';
		switch (this.icon) {
			case 'category':
				name = 'badge-category';
				break;
			case 'tag':
				name = 'badge-tag';
				break;
			case 'project':
				name = 'badge-folder';
				break;
			default:
				name = 'badge-tag';
				break;
		}
		return name;
	}

}
