import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from '~features/dashboard/containers/dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from '~features/dashboard/routes';
import { ActivityModule } from '~shared/activity/activity.module';
import { DialogModule } from '~shared/dialog';
import { CustomDialogModule } from '~shared/custom-dialog';
import { ProductDialogService } from '~shared/custom-dialog/services/product-dialog.service';
import { UtilsModule } from '~shared/utils';
import { LoadersModule } from '~shared/loaders';
import { SummaryComponent } from '~features/dashboard/components/summary/summary.component';
import { TeamCardComponent } from '~features/dashboard/components/team-card/team-card.component';
import { EventsCardComponent } from '~features/dashboard/components/events-card/events-card.component';
import { SharedModule } from '~shared/shared.module';
import { RatingModule } from '~shared/rating';
import { InputsCustomModule } from '~shared/inputs-custom/inputs-custom.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ActivityModule,
		DialogModule,
		CustomDialogModule,
		RatingModule,
		InputsCustomModule,
		FormsModule
	],
	declarations: [DashboardComponent, SummaryComponent, TeamCardComponent, EventsCardComponent],
	providers: [
		ProductDialogService
	]
})
export class DashboardModule { }
