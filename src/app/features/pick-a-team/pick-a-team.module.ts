import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasTeamGuard } from '~features/pick-a-team/services/has-team-guard.service';
import { PickATeamPageComponent } from './containers/pick-a-team-page/pick-a-team-page.component';
import { SharedModule } from '~shared/shared.module';
import { CreateATeamPageComponent } from './containers/create-a-team-page/create-a-team-page.component';
import { RouterModule } from '@angular/router';



@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([])
	],
	declarations: [
		PickATeamPageComponent,
		CreateATeamPageComponent
	],
	exports: [PickATeamPageComponent, CreateATeamPageComponent],
	providers: [HasTeamGuard]
})
export class PickATeamModule { }
