import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { User } from '~models';
import { BaseComponent } from '~shared/base-component/base-component';

@Component({
	selector: 'details-app',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailsComponent extends BaseComponent implements OnInit {
	@Input() votes: any;
	@Input() teamMembers: any;
	detailsShown = false;

	constructor() {
    super();
  }

	ngOnInit() { }

	showDetails() {
		this.detailsShown = true;
	}

	hideDetails() {
		this.detailsShown = false;
	}
}
