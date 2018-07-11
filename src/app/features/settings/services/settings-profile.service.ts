import { Injectable } from '@angular/core';
import { UserService } from '~global-services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { User } from '~models';
import { first } from '../../../../../node_modules/rxjs/operators';
import { Observable } from '../../../../../node_modules/apollo-link';

@Injectable()
export class SettingsProfileService {

	constructor(
		private userSrv: UserService,
		private uploaderSrv: UploaderService) { }

	selectUser() {
		return this.userSrv.selectUser();
	}

	updateUser(user: User) {
		this.userSrv.update(user).pipe(first()).subscribe();
	}

	addFile(file: File) {
		// Uncomment when realm user is wroking
		// this.uploader.uploadFile(file).pipe(
		// 	first()
		// ).subscribe(img => {
		// 	this.userSrv.update({
		// 		id: this.userId,
		// 		profilePic: img
		// 	}).pipe(first()).subscribe();
		// });
	}

	changePassword(pass: String) {
		// method to update password
	}

	checkCurrentPassword(pass: String) {
		// check current password return observable true or false
		return null;
	}
}
