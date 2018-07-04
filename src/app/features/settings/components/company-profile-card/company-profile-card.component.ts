import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TeamUser } from '~models';

@Component({
	selector: 'company-profile-card-app',
	templateUrl: './company-profile-card.component.html',
	styleUrls: ['./company-profile-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompanyProfileCardComponent implements OnInit {

	// @Input() item: Array<Company>; // Uncomment when Company realm is out
	@Input() form: FormGroup;

	constructor() { }

	ngOnInit() {
	}

}
