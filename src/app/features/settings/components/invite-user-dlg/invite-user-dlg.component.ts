import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil, first, map, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Project } from '~models';
import { DialogService } from '~shared/dialog';
import { MemberService } from '~features/settings/services/member.service';



@Component({
	selector: 'invite-user-dlgapp',
	templateUrl: './invite-user-dlg.component.html',
	styleUrls: ['./invite-user-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InviteUserDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;

	constructor(private dlgSrv: DialogService, private memberSrv: MemberService,
		private fb: FormBuilder) {
		super();
		this.form = this.fb.group(
			{
				email: ['', Validators.compose([Validators.required, Validators.email])]
			}
		);
	}

	submit() {
		// if (this.form.valid) {
		// 	this.pending = true;
		// 	const { email } = this.form.value;
		// 	this.memberSrv.inviteMember(email).subscribe(() => {
		// 		this.pending = false;
		// 		this.dlgSrv.close(this.dlgName);
		// 	});
		// }
	}
}
