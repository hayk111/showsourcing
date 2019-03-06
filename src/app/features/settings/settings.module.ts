import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { WorkflowMngmtCommonModule } from '~common/workflow/workflow-mngmt.module';
import { DataManagementModule } from '~features/data-management/data-management.module';
import {
	CompanyProfileCardComponent,
	ExportListViewComponent,
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


@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		DataManagementModule,
		WorkflowMngmtCommonModule
	],
	declarations: [
		CompanyProfileCardComponent,
		ExportListViewComponent,
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
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsModule {


}
