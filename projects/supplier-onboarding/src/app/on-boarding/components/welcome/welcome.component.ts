import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { log } from '~utils';

import { OnBoardingService } from '../../services';

@Component({
	selector: 'welcome-app',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {
	pending: boolean;
	error: string;
	constructor(private router: Router, private srv: OnBoardingService) { }

	ngOnInit() {
	}

	submit() {
		this.pending = true;
		this.srv.init().subscribe(
			_ => this.onSuccess(),
			e => this.onError(e)
		);
	}

	onSuccess() {
		this.pending = false;
		this.router.navigate(['proof-of-identity']);
	}

	onError(e: Error) {
		this.error = 'an error happened please try again';
		log.error(e);
		this.pending = false;
	}
}
