import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SettingsInvitationService } from '~features/settings/services/settings-invitation.service';
import { DialogService } from '~shared/dialog/services';
import { NotificationService, NotificationType } from '~shared/notifications';
import { AutoUnsub, translate } from '~utils';
import { CloseEventType } from '~shared/dialog';



@Component({
	selector: 'invite-user-dlgapp',
	templateUrl: './invite-user-dlg.component.html',
	styleUrls: ['./invite-user-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;

	constructor(private dlgSrv: DialogService,
		private invitationSrv: SettingsInvitationService,
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
					const invtSent = translate('Your invitation was sent to');
					this.dlgSrv.close({ type: CloseEventType.OK });
					this.notifSrv.add({
						type: NotificationType.SUCCESS,
						title: translate('Invitation sent'),
						message: `${invtSent} ${email}`,
						timeout: 3500
					});
				});
		}
	}
}
