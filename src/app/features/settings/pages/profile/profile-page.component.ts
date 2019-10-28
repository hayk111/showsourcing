import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { ChangePswdDlgComponent } from '~common/dialogs/custom-dialogs';
import { Client } from '~core/apollo/services/apollo-client-names.const';
import { UserService } from '~core/entity-services';
import { User } from '~models';
import { DialogService } from '~shared/dialog/services';
import { UploaderService } from '~shared/file/services/uploader.service';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'profile-page-app',
	templateUrl: './profile-page.component.html',
	styleUrls: ['./profile-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfilePageComponent extends AutoUnsub implements OnInit {

	user$: Observable<User>;
	userId: string;

	constructor(
		private userSrv: UserService,
		private dlgSrv: DialogService,
		private uploaderSrv: UploaderService
	) {
		super();
	}

	ngOnInit() {
		this.user$ = this.userSrv.selectUser();
		// This way we dont have to call the observable eachtime we need the id
		this.user$.pipe(first()).subscribe(m => this.userId = m.id);
	}

	updateUser(user: User) {
		user.id = this.userId;
		this.userSrv.update(user)
			.subscribe();
	}

	addFile(file: Array<File>) {
		this.uploaderSrv.uploadImages(file, this.userSrv.userSync, 'avatar', false, Client.CENTRAL).subscribe();
	}

	pswdModal() {
		this.dlgSrv.open(ChangePswdDlgComponent);
	}
}
