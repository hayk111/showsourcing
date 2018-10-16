import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AutoUnsub } from '~utils';
import { Router } from '@angular/router';

@Component({
	selector: 'find-business-app',
	templateUrl: './find-business.component.html',
	styleUrls: ['./find-business.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class FindBusinessComponent extends AutoUnsub implements OnInit {

	constructor(private router: Router) { super(); }

	ngOnInit() {
	}

	nextPage() {
		this.router.navigate(['supplier', 'address']);
	}

}
