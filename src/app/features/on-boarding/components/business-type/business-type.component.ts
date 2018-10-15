import { Component, OnInit, ChangeDetectionStrategy, ViewChild } from '@angular/core';
import { InputDirective } from '~shared/inputs';
import { Router } from '@angular/router';

@Component({
	selector: 'business-type-app',
	templateUrl: './business-type.component.html',
	styleUrls: ['./business-type.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BusinessTypeComponent implements OnInit {
	@ViewChild(InputDirective) input: InputDirective;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['supplier', 'address']);
	}

	nextPage() {
		this.router.navigate(['supplier', 'category']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}

}
