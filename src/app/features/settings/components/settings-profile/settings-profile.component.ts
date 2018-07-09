import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService, UserApolloService } from '~global-services';
import { User, AppImage } from '~models';
import { tap, first, switchMap } from 'rxjs/operators';
import { UploaderService } from '~shared/file/services/uploader.service';
import { DialogService } from '~shared/dialog';
import { ChangePswdDlgComponent } from '~features/settings/components/change-pswd-dlg/change-pswd-dlg.component';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent implements OnInit {

	user$: Observable<User>;
	userId: string;
	// company$: Observable<Company>; // Uncomment when Company realm is out

	constructor(
		private userSrv: UserService,
		private uploader: UploaderService,
		private dlgSrv: DialogService) {
		// private company: CompanyService) { // Uncomment when Company realm is out
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		// this.company$ = this.companySrv.selectAll(); // Uncomment when Company realm is out
	}

	updateUser(user: User) {
		user.id = this.userId;
		this.userSrv.update(user).subscribe();
	}

	addFile(file: File) {
		// Uncomment when realm user is wroking
		// this.uploader.uploadFile(file).pipe(
		// 	first()
		// ).subscribe(img => {
		// 	this.userSrv.update({
		// 		id: this.userId,
		// 		profilePic: img
		// 	}).subscribe();
		// });
	}

	pswdModal() {
		this.dlgSrv.open(ChangePswdDlgComponent);
	}
}
