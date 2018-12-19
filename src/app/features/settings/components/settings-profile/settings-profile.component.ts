import { ChangeDetectionStrategy, Component, NgModuleRef, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';
import { ChangePswdDlgComponent } from '~common/modals';
import { SettingsProfileService } from '../../services';
import { User } from '~models';
import { DialogService } from '~shared/dialog/services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub } from '~utils';
import { Client } from '~core/apollo/services/apollo-client-names.const';

@Component({
	selector: 'settings-profile-app',
	templateUrl: './settings-profile.component.html',
	styleUrls: ['./settings-profile.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsProfileComponent extends AutoUnsub implements OnInit {

	user$: Observable<User>;
	userId: string;

	constructor(
		private profileSrv: SettingsProfileService,
		private dlgSrv: DialogService,
		private uploaderSrv: UploaderService
	) {
		super();
	}

	ngOnInit() {
		this.user$ = this.profileSrv.selectUser();
		// This way we dont have to call the observable eachtime we need the id
		this.user$.pipe(first()).subscribe(m => this.userId = m.id);
	}

	updateUser(user: User) {
		user.id = this.userId;
		this.profileSrv.updateUser(user)
			.subscribe();
	}

	addFile(file: Array<File>) {
		this.uploaderSrv.uploadImages(file, undefined, Client.USER).pipe(
			switchMap(img => this.profileSrv.updateUser({
				id: this.userId,
				avatar: img[0]
			}))
		).subscribe();
	}

	pswdModal() {
		this.dlgSrv.open(ChangePswdDlgComponent);
	}
}
