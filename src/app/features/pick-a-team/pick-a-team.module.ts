import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthPagesCommonModule } from '~common/auth-pages/auth-pages.common.module';
import {
	CreateACompanyPageComponent,
} from '~features/pick-a-team/containers/create-a-company-page/create-a-company-page.component';
import { CreateATeamPageComponent } from '~features/pick-a-team/containers/create-a-team-page/create-a-team-page.component';
import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { SharedModule } from '~shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

import { routes } from './routes';


@NgModule({
	imports: [
		AuthPagesCommonModule,
		SharedModule,
		RouterModule.forChild(routes),
		TranslateModule
	],
	declarations: [
		PickATeamPageComponent,
		CreateATeamPageComponent,
		CreateACompanyPageComponent
	],
	exports: [
		PickATeamPageComponent,
		CreateATeamPageComponent,
		CreateACompanyPageComponent
	],
	providers: []
})
export class PickATeamModule { }
