import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
	selector: 'generic-error-page-app',
	templateUrl: './generic-error-page.component.html',
	styleUrls: ['./generic-error-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class GenericErrorPageComponent {

	constructor(private router: Router) {}

	goHome() {
		this.router.navigate(['']);
	}
}

