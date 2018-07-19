import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'tag-app',
	templateUrl: './tag.component.html',
	styleUrls: ['./tag.component.scss']
})
export class TagComponent implements OnInit {
	@Input() type: string;
	
	constructor() { }

	ngOnInit() {
	}

}
