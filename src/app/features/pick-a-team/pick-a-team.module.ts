import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasTeamGuard } from '~features/pick-a-team/services/has-team-guard.service';
import { PickATeamPageComponent } from './containers/pick-a-team-page/pick-a-team-page.component';
import { SharedModule } from '~shared/shared.module';



@NgModule({
	imports: [
		SharedModule
	],
	declarations: [
		PickATeamPageComponent
	],
	exports: [PickATeamPageComponent],
	providers: [HasTeamGuard]
})
export class PickATeamModule { }
