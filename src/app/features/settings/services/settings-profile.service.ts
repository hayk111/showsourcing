import { Injectable } from '@angular/core';
import { UserService } from '~global-services';
import { User } from '~models';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AuthenticationService } from '~features/auth/services/authentication.service';
import { Observable } from 'subscriptions-transport-ws';

@Injectable({
	providedIn: 'root'
})
export class SettingsProfileService {

	constructor(
		private userSrv: UserService,
		private uploaderSrv: UploaderService,
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
