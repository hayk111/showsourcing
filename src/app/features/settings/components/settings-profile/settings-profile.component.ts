import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { User, Team } from '~models';
import { Observable } from 'rxjs';
import { UserService, TeamService } from '~shared/global-services';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent implements OnInit {
	form: FormGroup;
	user$: Observable<User>;
	teams$: Observable<Team[]>;

	constructor(
		private fb: FormBuilder,
		private userSrv: UserService,
		private teamSrv: TeamService) {

		this.form = this.fb.group({
			firstName: ['', Validators.required],
			lastName: ['', Validators.required],
			email: ['', Validators.compose([Validators.email, Validators.required])]
		});
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		this.teams$ = this.teamSrv.selectTeams();
	}

	update(propName: string, value: string) {
		// this.store.dispatch(UserActions.patch({ propName, value }));
	}

}
