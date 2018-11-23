import { Route } from '@angular/router';
import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { CreateATeamPageComponent } from './containers/create-a-team-page/create-a-team-page.component';
import { HasCompanyGuard } from './services/has-company.guard';
import { HasTeamGuard } from './services/has-team.guard';
import { CreateACompanyPageComponent } from './containers/create-a-company-page/create-a-company-page.component';


export const routes: Route[] = [
	{
		path: '',
		redirectTo: 'pick-a-team',
		pathMatch: 'full'
	},
	{
		path: 'create-a-team',
		component: CreateATeamPageComponent,
		canActivate: [HasCompanyGuard]
	},
	{
		path: 'pick-a-team',
		component: PickATeamPageComponent,
		canActivate: [HasTeamGuard]
	},
	{ path: 'create-a-company', component: CreateACompanyPageComponent }
];
