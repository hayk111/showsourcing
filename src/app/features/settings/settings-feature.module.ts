import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { routes } from '~features/settings/routes';
import { SharedModule } from '~shared/shared.module';

import { SettingsPageComponent } from './pages/settings-page.component';

import * as CompanyPages from './pages/company';
import * as ProfilePages from './pages/profile';
import * as TeamPages from './pages/team';
import * as ExportsPages from './pages/exports';
import * as WorkflowPages from './pages/workflow';
import * as DataPages from './pages/data-management';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
	],
	declarations: [
		SettingsPageComponent,
		// profile
		ProfilePages.ProfilePageComponent,
		ProfilePages.ProfileCardComponent,
		// company
		CompanyPages.CompanyPageComponent,
		CompanyPages.InfoPageComponent,
		CompanyPages.UsersPageComponent,
		CompanyPages.TeamsPageComponent,
		CompanyPages.CompanyCardComponent,
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
		ExportsPages.ExportTableComponent,
		// data
		DataPages.DataManagementPageComponent,
		DataPages.CategoryDataPageComponent,
		DataPages.EventDataPageComponent,
		DataPages.SupplierDataPageComponent,
		DataPages.TagDataPageComponent,
		// workflow
		WorkflowPages.WorkflowPageComponent,
		WorkflowPages.ProductStatusPageComponent,
		WorkflowPages.SampleStatusPageComponent,
		WorkflowPages.SupplierStatusPageComponent,
		WorkflowPages.WorkflowManagamentTableComponent

	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsFeatureModule {


}
