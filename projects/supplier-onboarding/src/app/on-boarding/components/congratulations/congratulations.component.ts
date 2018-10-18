import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'congratulations-app',
	templateUrl: './congratulations.component.html',
	styleUrls: ['./congratulations.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CongratulationsComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['verification']);
	}

	nextPage() {
		this.router.navigate(['welcome']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
