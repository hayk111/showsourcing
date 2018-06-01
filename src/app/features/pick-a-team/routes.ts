import { PickATeamPageComponent } from '~features/pick-a-team/containers/pick-a-team-page/pick-a-team-page.component';
import { Route } from '@angular/router';
import { HasTeamGuard } from '~features/pick-a-team/services/has-team-guard.service';


export const routes: Route = {
	path: '',
	component: PickATeamPageComponent
};
