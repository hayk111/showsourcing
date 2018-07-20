import { Injectable } from '@angular/core';
import { UserService } from '~global-services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { User } from '~models';
import { first } from 'rxjs/operators';
import { AutoUnsub } from '~utils';

@Injectable({
	providedIn: 'root'
})
export class SettingsProfileService {

	constructor(
		private userSrv: UserService,
		private uploaderSrv: UploaderService) { }

	selectUser() {
		return this.userSrv.selectUser();
	}

	updateUser(user: User) {
		return this.userSrv.update(user);
	}

	changePassword(pass: String) {
		// method to update password
	}

	checkCurrentPassword(pass: String) {
		// check current password return observable true or false
		return null;
	}
}
