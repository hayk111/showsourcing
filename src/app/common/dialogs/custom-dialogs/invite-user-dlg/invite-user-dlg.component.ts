import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogService } from '~shared/dialog/services';
import { AutoUnsub } from '~utils';

@Component({
	selector: 'invite-user-dlgapp',
	templateUrl: './invite-user-dlg.component.html',
	styleUrls: ['./invite-user-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InviteUserDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;

	constructor(
		private dlgSrv: DialogService,
		private fb: FormBuilder,
	) {
		super();
		this.form = this.fb.group({
			email: ['', Validators.compose([Validators.required, Validators.email])],
		});
	}

	submit() {
		if (!this.form.valid) return;

		const { email } = this.form.value;
		this.dlgSrv.data({email});
		this.dlgSrv.close();
	}
}
