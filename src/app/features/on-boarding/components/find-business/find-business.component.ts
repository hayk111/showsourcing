import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'find-business-app',
	templateUrl: './find-business.component.html',
	styleUrls: ['./find-business.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBusinessComponent extends AutoUnsub implements OnInit {

	constructor() { super(); }

	ngOnInit() {
	}

}
