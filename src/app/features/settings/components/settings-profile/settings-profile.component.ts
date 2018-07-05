import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, UserApolloService } from '~global-services';
import { User } from '~models';
import { tap, first, switchMap } from 'rxjs/operators';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent implements OnInit {

	user$: Observable<User>;
	// company$: Observable<Company>; // Uncomment when Company realm is out

	constructor(private userSrv: UserService) {
		// private company: CompanyService) { // Uncomment when Company realm is out
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectOne();
		// this.company$ = this.companySrv.selectAll(); // Uncomment when Company realm is out
	}

	updateUser(user: User) {
		this.user$.pipe(first(), switchMap((m) => {
			user.id = m.id;
			return this.userSrv.update(user);
		})).subscribe();
	}

}
