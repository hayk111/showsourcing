import { ChangeDetectionStrategy, Component, OnInit, NgModuleRef } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePswdDlgComponent } from '~features/settings/components/change-pswd-dlg/change-pswd-dlg.component';
import { UserService } from '~global-services';
import { User } from '~models';
import { DialogService } from '~shared/dialog';
import { UploaderService } from '~shared/file/services/uploader.service';
import { first, switchMap, map } from 'rxjs/operators';
import { SettingsProfileService } from '~features/settings/services/settings-profile.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent extends AutoUnsub implements OnInit {

	user$: Observable<User>;
	userId: string;
	// company$: Observable<Company>; // Uncomment when Company realm is out

	constructor(
		private profileSrv: SettingsProfileService,
		private dlgSrv: DialogService,
		private uploaderSrv: UploaderService,
		private moduleRef: NgModuleRef<any>) {
		// private company: CompanyService) { // Uncomment when Company realm is out
		super();
	}

	ngOnInit() {
		this.user$ = this.profileSrv.selectUser();
		this.user$.pipe(first()).subscribe(m => this.userId = m.id); // This way we dont have to call the observable eachtime we need the id
		// this.company$ = this.companySrv.selectAll(); // Uncomment when Company realm is out
	}

	updateUser(user: User) {
		user.id = this.userId;
		this.profileSrv.updateUser(user).subscribe();
	}

	addFile(file: Array<File>) {
		this.uploaderSrv.uploadImages(file)
			.subscribe(img => {
				delete img[0].creationDate,
					delete img[0].lastUpdateDate,
					delete img[0].deleted,
					this.profileSrv.updateUser({
						id: this.userId,
						avatar: img[0]
					}).subscribe();
			});
	}

	pswdModal() {
		this.dlgSrv.openFromModule(ChangePswdDlgComponent, this.moduleRef);
	}
}
