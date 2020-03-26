import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { routes } from '~features/settings/routes';
import { SharedModule } from '~shared/shared.module';

import { SettingsPageComponent } from './pages/settings-page.component';

import * as CompanyPages from './pages/company';
import * as ProfilePages from './pages/profile';
import * as TeamPages from './pages/team';
import * as ExportsPages from './pages/exports';
import * as WorkflowPages from './pages/workflow';
import * as DataPages from './pages/list-management';
import { TablesCommonModule } from '~common/tables/tables-common.module';

@NgModule({
	imports: [
		RouterModule.forChild(routes),
		SharedModule,
		TablesCommonModule
	],
	declarations: [
		SettingsPageComponent,
		// profile
		ProfilePages.ProfilePageComponent,
		ProfilePages.ProfileCardComponent,
		// company
		CompanyPages.CompanyPageComponent,
		CompanyPages.InfoPageComponent,
		CompanyPages.CompanyCardComponent,
		// team
		TeamPages.TeamPageComponent,
		TeamPages.SettingsPageComponent,
		TeamPages.MembersPageComponent,
		TeamPages.TeamCardComponent,
		TeamPages.SettingsTeamMembersUsersComponent,
		// exports
		ExportsPages.ExportsPageComponent,
		// data
		DataPages.ListManagementPageComponent,
		DataPages.CategoryDataPageComponent,
		DataPages.TagDataPageComponent,
		// workflow
		WorkflowPages.WorkflowPageComponent,
		WorkflowPages.ProductStatusPageComponent,
		WorkflowPages.SampleStatusPageComponent,
		WorkflowPages.SupplierStatusPageComponent,
	],
	entryComponents: [],
	exports: [],
	providers: []
})
export class SettingsFeatureModule {


}
