import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { DataManagementModule } from '~features/data-management/data-management.module';
import { routes } from '~features/settings/routes';
import { SharedModule } from '~shared/shared.module';
import {
	CompanyProfileCardComponent,
	ExportTableComponent,
	ProfileCardComponent,
	CompanyCardComponent,
} from '~features/settings/components';
import {
	SettingsPageComponent,
} from './pages/settings-page.component';

import * as CompanyPages from './pages/company';
import * as ProfilePages from './pages/profile';
import * as TeamPages from './pages/team';
import * as ExportsPages from './pages/exports';
import * as WorkflowPages from './pages/workflow';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DataManagementModule,
		WorkflowMngmtCommonModule
	],
	declarations: [
		CompanyProfileCardComponent,
		ExportTableComponent,
		ProfileCardComponent,
		CompanyCardComponent,
		SettingsPageComponent,
		// profile
		ProfilePages.ProfilePageComponent,
		// company
		CompanyPages.CompanyPageComponent,
		CompanyPages.InfoPageComponent,
		CompanyPages.UsersPageComponent,
		CompanyPages.TeamsPageComponent,
		// team
		TeamPages.TeamPageComponent,
		TeamPages.InfoPageComponent,
		TeamPages.MembersPageComponent,
		TeamPages.TeamCardComponent,
		TeamPages.SettingsTeamMembersInvitationsComponent,
		TeamPages.SettingsTeamMembersUsersComponent,
		// TODO: Hayk those 2 needs to be in the common/tables
		TeamPages.InvitationsTableComponent,
		TeamPages.TeamMembersTableComponent,
		// exports
		ExportsPages.ExportsPageComponent,
		// data
		// workflow
		WorkflowPages.WorkflowPageComponent,
		WorkflowPages.ProductStatusPageComponent,
		WorkflowPages.SampleStatusPageComponent,
		WorkflowPages.SupplierStatusPageComponent

	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsModule {


}
