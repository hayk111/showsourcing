import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
	CreateACompanyPageComponent,
} from '~features/pick-a-team/containers/create-a-company-page/create-a-company-page.component';
import { CreateATeamPageComponent } from '~features/pick-a-team/containers/create-a-team-page/create-a-team-page.component';

import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { SharedModule } from '~shared/shared.module';
import { routes } from './routes';
import { AuthPagesModule } from '~features/auth-pages/auth-pages.module';


@NgModule({
	imports: [
		SharedModule,
		AuthPagesModule,
		RouterModule.forChild(routes)
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
