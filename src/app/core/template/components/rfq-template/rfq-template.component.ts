import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { AutoUnsub } from '~utils';
import { ActivatedRoute } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { GuestClientInitializer } from '~core/apollo';
import { TokenService } from '~core/auth';

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
