import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub } from '~utils';



@Component({
	selector: 'invite-user-dlgapp',
	templateUrl: './invite-user-dlg.component.html',
	styleUrls: ['./invite-user-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;
	callback: Function;

	constructor(private dlgSrv: DialogService,
		private invitationSrv: InvitationFeatureService,
		private fb: FormBuilder,
		private notifSrv: NotificationService
	) {
		super();
		this.form = this.fb.group(
			{
				email: ['', Validators.compose([Validators.required, Validators.email])]
			}
		);
	}

	submit() {
		if (this.form.valid) {
			this.pending = true;
			const { email } = this.form.value;
			this.invitationSrv.createInvitation(email)
				.subscribe(() => {
					this.pending = false;
					this.dlgSrv.close();
					if (this.callback) {
						this.callback();
					}
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: 'Invitation Sent',
						message: `Your invitation was sent to ${email}`,
						timeout: 3500
					});
				});
		}
	}
}
