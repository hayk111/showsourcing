import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangePswdDlgComponent } from '~common/dialogs/custom-dialogs';
import { DialogService } from '~shared/dialog/services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { UserService } from '~core/auth';
import { ApiService, User } from '~core/erm3';

@Component({
	selector: 'profile-page-app',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent implements OnInit {

	user$: Observable<User>;
	userId: string;

	constructor(
		private userSrv: UserService,
		private apiSrv: ApiService,
		private dlgSrv: DialogService,
		private uploaderSrv: UploaderService
	) {
	}

	ngOnInit() {
		this.user$ = this.userSrv.user$;
		// This way we dont have to call the observable eachtime we need the id
		this.user$.pipe(first())
			.subscribe(user => this.userId = user.id);
	}

	updateUser(user: User) {
		user.id = this.userId;
		this.apiSrv.update('User', user)
			.subscribe();
	}

	addFile(files: Array<File>) {
		// this.uploaderSrv.uploadImages(files, this.nodeId)
		// 	.onTempImages(tempImgs => do whathever)
		// 	.subscribe(_ => on upload finish);
	}

	pswdModal() {
		this.dlgSrv.open(ChangePswdDlgComponent);
	}
}
