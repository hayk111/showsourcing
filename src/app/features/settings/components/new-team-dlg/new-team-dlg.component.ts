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
	selector: 'new-team-dlgapp',
	templateUrl: './new-team-dlg.component.html',
	styleUrls: ['./new-team-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTeamDlgComponent extends AutoUnsub {
	form: FormGroup;
	pending = false;

	constructor(private dlgSrv: DialogService, private memberSrv: MemberService,
		private fb: FormBuilder) {
		super();
		this.form = this.fb.group(
			{
				name: ['', Validators.required]
			}
		);
	}

	submit() {
		if (this.form.valid) {
			this.pending = true;
			const { name } = this.form.value;
			// TODO: leverage the team service to actually create the team
		}
	}

}
