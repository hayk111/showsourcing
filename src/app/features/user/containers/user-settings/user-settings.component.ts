import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, Team } from '~models';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user.service';

@Component({
	selector: 'user-settings-app',
	templateUrl: './user-settings.component.html',
	styleUrls: ['./user-settings.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsComponent implements OnInit {
	form: FormGroup;
	user$: Observable<User>;
	teams$: Observable<Team[]>;

	constructor(private fb: FormBuilder, private userSrv: UserService) {
		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.email, Validators.required])]
		});
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.teams$ = this.userSrv.selectTeams();
	}

	update(propName: string, value: string) {
		// this.store.dispatch(UserActions.patch({ propName, value }));
	}

}
