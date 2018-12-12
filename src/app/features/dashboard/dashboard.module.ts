import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { EventsCardComponent } from '~features/dashboard/components/events-card/events-card.component';
import { SummaryComponent } from '~features/dashboard/components/summary/summary.component';
import { TeamCardComponent } from '~features/dashboard/components/team-card/team-card.component';
import { DashboardComponent } from '~features/dashboard/containers/dashboard/dashboard.component';
import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ActivityCommonModule,
		DialogModule,
	],
	declarations: [
		DashboardComponent,
		SummaryComponent,
		TeamCardComponent,
		EventsCardComponent
	],
	providers: [
		ProductDialogService
	]
})
export class DashboardModule { }
