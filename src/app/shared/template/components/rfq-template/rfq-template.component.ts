import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'rfq-template-app',
	templateUrl: './rfq-template.component.html',
	styleUrls: ['./rfq-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqTemplateComponent implements OnInit {

	constructor() { }

	ngOnInit() {
	}

}
