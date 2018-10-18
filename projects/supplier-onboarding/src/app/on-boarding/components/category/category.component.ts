import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OnBoardingService } from '../../services';

@Component({
	selector: 'category-app',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent implements OnInit {

	private categories: string[];

	constructor(
		private router: Router,
		private onBoardSrv: OnBoardingService) { }

	ngOnInit() {
		this.categories = this.onBoardSrv.getClaim().categories || [];
	}

	change(category) {
		if (!this.categories)
			this.categories.push(category);
		else if (!this.categories.includes(category)) {
			this.categories.push(category);
			this.onBoardSrv.updateClaim({ categories: this.categories });
		}
	}

	delete(category: string) {
		this.categories = this.categories.filter(cat => cat !== category);
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
