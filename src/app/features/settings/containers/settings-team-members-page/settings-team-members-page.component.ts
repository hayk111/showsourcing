import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NewSupplierDlgComponent } from '~features/supplier/containers/new-supplier-dlg/new-supplier-dlg.component';
import { MemberFeatureService } from '~features/settings/services/member-feature.service';
import { ERM, TeamUser } from '~models';
import { DialogService } from '~shared/dialog';
import { FilterService } from '~shared/filters';
import { ListPageComponent } from '~shared/list-page/list-page.component';
import { SelectionService } from '~shared/list-page/selection.service';
import { StoreKey } from '~utils/store/store';
import { CreationDialogComponent } from '~shared/generic-dialog';

// import { SelectionService } from '~shared/list-page/selection.service';
import { NewTaskDlgComponent } from '~features/tasks';
import { InviteUserDlgComponent } from '~features/settings/components';


// TODO: thierry there is ListPageComponent and ListView component that alleviate
// list pages from A LOT of logic. It's really fast to refactor, check product list
// component or supplier list component.
// also you should provide a key to filter service and inject selection service as well
// next to it
// You also need 1 feature service now that extend the global service of whatever service
// the page is about. Again please check suppliers-page, as it will give you a good
// view of how simple this turns out to be.
@Component({
	selector: 'settings-team-members-page-app',
	templateUrl: './settings-team-members-page.component.html',
	styleUrls: ['./settings-team-members-page.component.scss'],
	providers: [
		FilterService,
		{ provide: 'storeKey', useValue: StoreKey.FILTER_TEAM_USERS },
		SelectionService
	]
})
export class SettingsTeamMembersPageComponent extends ListPageComponent<TeamUser, MemberFeatureService> {

	constructor(
		protected router: Router,
		protected memberSrv: MemberFeatureService,
		protected selectionSrv: SelectionService,
		protected filterSrv: FilterService,
		protected dlgSrv: DialogService,
	) {
		super(router, memberSrv, selectionSrv, filterSrv, dlgSrv, ERM.TEAM_USER);
		// this.sort({ sortBy: 'user.firstName', sortOrder: 'DESC' });
	}


	/** Opens the dialog for creating a new team */
	openNewTeamDialog() {
		this.dlgSrv.open(NewTaskDlgComponent);
	}

	/** Opens the dialog for inviting a new user */
	openInviteDialog() {
		this.dlgSrv.open(InviteUserDlgComponent);
	}

	accessTypeUpdated({ member, accessType }: { member: TeamUser; accessType: string }) {
		// TODO: Thiery I believe this if/else doesn't do anything
		// if (member) {
		//      this.memberSrv.updateMember({
		//              ...member,
		//              accessType
		//      }).subscribe();
		// } else {
		//      this.memberSrv.updateMembers({
		//              accessType
		//      }).subscribe();
		// }
	}

	/** Deletes the currently selected members */
	deleteSelection() {
		// this.memberSrv.deleteMembers(Array.from(this.selectionSrv.selection.keys()));
		this.resetSelection();
	}

}
