import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'rfq-template-app',
	templateUrl: './rfq-template.component.html',
	styleUrls: ['./rfq-template.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class RfqTemplateComponent extends AutoUnsub implements OnInit {
	constructor(
	) {
		super();
	}

	ngOnInit() {
	}

}
