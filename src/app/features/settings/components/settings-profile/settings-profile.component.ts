import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { UserService } from '~global-services';
import { User } from '~models';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent implements OnInit {
	// formCompany: FormGroup;
	user$: Observable<User>;
	// company$: Observable<Company>; // Uncomment when Company realm is out

	constructor(private userSrv: UserService) {
		// private company: CompanyService) { // Uncomment when Company realm is out
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		// this.company$ = this.companySrv.selectAll(); // Uncomment when Company realm is out

		// Uncomment when Company realm is out
		// this.formCompany = this.fb.group({
		// 	companyName: ['', Validators.required],
		// 	country: ['', Validators.required], // create selector form ma
		// 	address: ['', Validators.required],
		// 	taxId: ['', Validators.required]
		// });
	}

	updateUser(user: User) {
		this.userSrv.update(user);
	}

}
