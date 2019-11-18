import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'info-badge-app',
	templateUrl: './info-badge.component.html',
	styleUrls: ['./info-badge.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InfoBadgeComponent implements OnInit {

	@Input() type: 'category' | 'tag' | 'project';
	@Input() size = 's';
	@Input() hasDelete = false;
	@Output() delete = new EventEmitter<null>();
	color: string;
	infoType: string;
	name = '';

	constructor() { }

	ngOnInit() {
		this.initNames();
	}

	initNames() {
		switch (this.type) {
			case 'category':
				this.infoType = 'accent';
				break;
			case 'tag':
				this.infoType = 'secondary';
				break;
			case 'project':
				this.infoType = 'primary';
				break;
			default:
				this.infoType = 'secondary';
				break;
		}
		return this.name;
	}


}
