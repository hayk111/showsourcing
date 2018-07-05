import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil, first, map } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Invitation } from '~models';
import { DialogService } from '~shared/dialog';
import { InvitationFeatureService } from '~features/settings/services/invitation-feature.service';



@Component({
	selector: 'invite-user-dlgapp',
	templateUrl: './invite-user-dlg.component.html',
	styleUrls: ['./invite-user-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;

	constructor(private dlgSrv: DialogService, private invitationSrv: InvitationFeatureService,
		private fb: FormBuilder) {
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
				});
		}
	}
}
