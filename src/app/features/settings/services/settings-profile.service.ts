import { Injectable } from '@angular/core';
import { AuthenticationService } from '~core/auth/services/authentication.service';
import { UserService } from '~entity-services';
import { User } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';

@Injectable({
	providedIn: 'root'
})
export class SettingsProfileService {

	constructor(
		private userSrv: UserService,
		private authSrv: AuthenticationService) { }

	selectUser() {
		return this.userSrv.selectUser();
	}

	updateUser(user: User) {
		return this.userSrv.update(user);
	}

	// check current password return observable true or false
	checkCurrentPassword(password: string) {
		return this.authSrv.checkPassword({ identifier: this.userSrv.userSync.email, password });
	}

	// changes the password return observable true or false
	changePassword(password: string) {
		return this.authSrv.changePassword(this.userSrv.userSync.id, password);
	}
}
