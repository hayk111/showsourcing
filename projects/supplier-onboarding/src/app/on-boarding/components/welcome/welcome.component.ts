import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'welcome-app',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	nextPage() {
		this.router.navigate(['find-business']);
	}
}
