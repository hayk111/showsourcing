import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasTeamGuardService } from '~features/pick-a-team/services/has-team-guard.service';
import { PickATeamPageComponent } from './containers/pick-a-team-page/pick-a-team-page.component';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [

	PickATeamPageComponent],
	providers: [HasTeamGuardService]
})
export class PickATeamModule { }
