import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'validate-email-page-app',
	templateUrl: './validate-email-page.component.html',
	styleUrls: ['./validate-email-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidateEmailPageComponent implements OnInit {

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const token = this.route.snapshot.params.token;
		// this.authSrv.validateEmail(token).subscribe(_ => this.router.navigate(['']));
	}

}
