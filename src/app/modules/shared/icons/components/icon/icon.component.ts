import { Component, OnInit, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core/src/change_detection/constants';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconComponent implements OnInit {
	@Input() name: string;
	@Input() sizePx: number;
	@Input() size: 'xs' | 's' | 'default' | 'l' | 'xl' | 'xxl';
	@Input() color: 'primary' | 'secondary' | 'success' | 'warn';
	constructor() { }

	ngOnInit() {
	}

}
