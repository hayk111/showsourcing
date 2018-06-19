import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { takeUntil, first, map, switchMap } from 'rxjs/operators';
import { AutoUnsub } from '~utils';
import { Project } from '~models';
import { DialogName, DialogService } from '~shared/dialog';
import { addDialog } from '~shared/dialog/models/dialog-component-map.const';
import { MemberService } from '~features/settings/services/member.service';


const addDlg = () => addDialog(NewTeamDlgComponent, DialogName.NEW_TEAM);

@Component({
	selector: 'new-team-dlgapp',
	templateUrl: './new-team-dlg.component.html',
	styleUrls: ['./new-team-dlg.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewTeamDlgComponent extends AutoUnsub implements OnInit {
	form: FormGroup;
	dlgName = DialogName.NEW_TEAM;
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

	ngOnInit() {
		// this.projects$ = this.projectSrv.selectProjects();
	}

	/* select(id, value) {
		this.selected[id] = value;
	}

	unselect(id) {
		delete this.selected[id];
	} */

	submit() {
		if (this.form.valid) {
			this.pending = true;
			const { name } = this.form.value;
			/* this.memberSrv.inviteMember(email).subscribe(() => {
				this.pending = false;
				this.dlgSrv.close(this.dlgName);
			}); */
		}
	}

}

addDlg();
