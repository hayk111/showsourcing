import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { OnBoardingService } from '../../services';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'category-app',
	templateUrl: './category.component.html',
	styleUrls: ['./category.component.scss', './../common-boarding.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CategoryComponent extends TrackingComponent implements OnInit {

	categories: string[];

	constructor(
		private router: Router,
		private onBoardSrv: OnBoardingService) {
			super();
	}

	ngOnInit() {
		this.categories = this.onBoardSrv.getClaim().categories || [];
	}

	change(category) {
		if (typeof (category) === 'string') { // prevents the type event from being added to the array
			if (!this.categories) {
				this.categories.push(category);
				this.updateClaim();
			} else if (!this.categories.includes(category)) {
				this.categories.push(category);
				this.updateClaim();
			}
		}
	}

	delete(category: string) {
		this.categories = this.categories.filter(cat => cat !== category);
		this.updateClaim();
	}

	updateClaim() {
		this.onBoardSrv.updateClaim({ categories: this.categories }).subscribe();
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
