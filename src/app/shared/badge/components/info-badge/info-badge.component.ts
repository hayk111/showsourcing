import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'info-badge-app',
	templateUrl: './info-badge.component.html',
	styleUrls: ['./info-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBadgeComponent implements OnInit {

	@Input() type: 'category' | 'tag' | 'project' = 'category';
	@Input() size = 'mini';
	@Input() hasDelete = false;
	@Output() delete = new EventEmitter<null>();
	color: string;

	constructor() { }

	ngOnInit() {
	}

	get iconName() {
		let name = '';
		switch (this.type) {
			case 'category':
				name = 'category';
				this.color = 'color-white';
				break;
			case 'tag':
				name = 'tag';
				this.color = 'color-txt-secondary';
				break;
			case 'project':
				name = 'folder-light';
				this.color = 'color-txt-secondary';
				break;
			default:
				name = 'badge-tag';
				this.color = 'color-txt-secondary';
				break;
		}
		return name;
	}

}
