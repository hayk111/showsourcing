import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { SummaryComponent } from '~features/dashboard/components/summary/summary.component';
import { DashboardHeaderComponent } from '~features/dashboard/components/dashboard-header/dashboard-header.component';
import { TeamCardComponent } from '~features/dashboard/components/team-card/team-card.component';
import { DashboardComponent } from '~features/dashboard/containers/dashboard/dashboard.component';
import { TodoBoxComponent } from '~features/dashboard/components/todo-box/todo-box.component';
import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { ProductCommonModule } from '~common/product';
import { TaskCommonModule } from '~common/task';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';

import {
	TodoBoxTaskPreviewComponent,
	TodoBoxProductsPreviewComponent,
	TodoBoxSamplePreviewComponent,
	TodoBoxSupplierPreviewComponent
} from '~features/dashboard/components/todo-box/todo-box-tables';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild(routes),
		ActivityCommonModule,
		DialogModule,
		ProductCommonModule,
		TaskCommonModule,
		SampleCommonModule,
		SupplierCommonModule,
	],
	declarations: [
		DashboardComponent,
		SummaryComponent,
		TeamCardComponent,
		DashboardHeaderComponent,
		TodoBoxComponent,
		TodoBoxTaskPreviewComponent,
		TodoBoxProductsPreviewComponent,
		TodoBoxSamplePreviewComponent,
		TodoBoxSupplierPreviewComponent
	],
	providers: [
		ProductDialogService
	]
})
export class DashboardModule { }
