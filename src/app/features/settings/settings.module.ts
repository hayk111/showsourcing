import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DataManagementModule } from '~features/data-management/data-management.module';
import {
	CompanyProfileCardComponent,
	InvitationsListViewComponent,
	ProductStatusWorkflowComponent,
	ProfileCardComponent,
	SampleStatusWorkflowComponent,
	SettingsProfileComponent,
	SupplierStatusWorkflowComponent,
	TeamMembersListViewComponent,
} from '~features/settings/components';
import {
	SettingsComponent,
	SettingsExportComponent,
	SettingsFieldsPageComponent,
	SettingsTeamMembersInvitationsComponent,
	SettingsTeamMembersPageComponent,
	SettingsTeamMembersUsersComponent,
	SettingsWorkflowsPageComponent,
} from '~features/settings/containers';
import { routes } from '~features/settings/routes';
import { SharedModule } from '~shared/shared.module';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';

import { ExportListViewComponent } from './components/export-list-view/export-list-view.component';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DataManagementModule,
		WorkflowMngmtCommonModule
	],
	declarations: [
		CompanyProfileCardComponent,
		InvitationsListViewComponent,
		ProductStatusWorkflowComponent,
		ProfileCardComponent,
		SampleStatusWorkflowComponent,
		SettingsComponent,
		SettingsExportComponent,
		SettingsFieldsPageComponent,
		SettingsProfileComponent,
		SettingsTeamMembersInvitationsComponent,
		SettingsTeamMembersPageComponent,
		SettingsTeamMembersUsersComponent,
		SettingsWorkflowsPageComponent,
		SupplierStatusWorkflowComponent,
		TeamMembersListViewComponent,
		ExportListViewComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsModule {


}
