import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OnBoardingService } from '../../services';
import { SupplierClaim } from '~models';

@Component({
	selector: 'welcome-app',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

	constructor(private router: Router, private srv: OnBoardingService) { }

	ngOnInit() {
	}

	nextPage() {
		this.srv.init();
		this.router.navigate(['find-business']);
	}
}
