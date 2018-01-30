import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'icon-app',
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
	@Input() name: string;
	@Input() width;
	@Input() height;
	constructor() { }

	ngOnInit() {
	}

}
