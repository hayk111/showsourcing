import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'basic-info-icons-info-app',
	templateUrl: './basic-info-icons-info.component.html',
	styleUrls: ['./basic-info-icons-info.component.scss']
})
export class BasicInfoIconsInfoComponent implements OnInit {
	infos = ['ic1', 'ic2', 'ic3', 'ic4'];

	constructor() { }

	ngOnInit() {
	}

}
