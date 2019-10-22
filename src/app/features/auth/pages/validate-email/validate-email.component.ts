import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'validate-email-app',
	templateUrl: './validate-email.component.html',
	styleUrls: ['./validate-email.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ValidateEmailComponent implements OnInit {

	constructor(
		private authSrv: AuthenticationService,
		private route: ActivatedRoute,
		private router: Router
	) { }

	ngOnInit() {
		const token = this.route.snapshot.params.token;
		this.authSrv.validateEmail(token).subscribe(_ => this.router.navigate(['']));
	}

}
