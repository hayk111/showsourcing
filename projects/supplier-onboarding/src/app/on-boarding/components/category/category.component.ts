import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'category-app',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

	constructor(private router: Router) { }

	ngOnInit() {
	}

	previousPage() {
		this.router.navigate(['business-type']);
	}

	nextPage() {
		this.router.navigate(['business-description']);
	}

	onSubmit() {
		// stuff
		this.nextPage();
	}
}
