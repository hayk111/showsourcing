import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';

@Component({
	selector: 'rfq-template-app',
	templateUrl: './rfq-template.component.html',
	styleUrls: ['./rfq-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqTemplateComponent implements OnInit {
	@ViewChild('main') mainRef;

	constructor() { }

	ngOnInit() {
	}

	onActivate(event) {
		// this.mainRef.nativeElement.scrollIntoView();
		window.scrollTo(0, 0);
	}
}
