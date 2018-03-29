import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'guest-template-app',
	templateUrl: './guest-template.component.html',
	styleUrls: ['./guest-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuestTemplateComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
