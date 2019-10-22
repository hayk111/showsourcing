import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { SummaryComponent } from '~features/dashboard/components/summary/summary.component';
import { DashboardHeaderComponent } from '~features/dashboard/components/dashboard-header/dashboard-header.component';
import { TeamCardComponent } from '~features/dashboard/components/team-card/team-card.component';
import { DashboardPageComponent } from '~features/dashboard/pages/dashboard/dashboard-page.component';
import { TodoBoxComponent } from '~features/dashboard/pages/dashboard/todo-box/todo-box.component';
import { TodoNavComponent } from '~features/dashboard/pages/dashboard/todo-box/todo-nav/todo-nav.component';
import { TeamPerformanceComponent} from '~features/dashboard/components/team-performance/team-performance.component';
import { LineChartComponent } from '~features/dashboard/components/line-chart/line-chart.component';
import { ActivityComponent } from '~features/dashboard/pages/dashboard/activity/activity.component';
import { ActivityEmptyComponent } from '~features/dashboard/pages/dashboard/activity/activity-empty/activity-empty.component';
import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { ProductCommonModule } from '~common/product';
import { TaskCommonModule } from '~common/task';
import { SampleCommonModule } from '~common/sample';
import { SupplierCommonModule } from '~common/supplier';
import { ChartsModule } from 'ng2-charts';

import {
	TodoBoxTaskPreviewComponent,
	TodoBoxProductsPreviewComponent,
	TodoBoxSamplePreviewComponent,
	TodoBoxSupplierPreviewComponent
} from '~features/dashboard/pages/dashboard/todo-box/todo-box-tables';

@NgModule({
	imports: [
		ChartsModule,
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
		DashboardPageComponent,
		ActivityComponent,
		ActivityEmptyComponent,
		SummaryComponent,
		TeamCardComponent,
		DashboardHeaderComponent,
		LineChartComponent,
		TodoBoxComponent,
		TodoNavComponent,
		TodoBoxTaskPreviewComponent,
		TodoBoxProductsPreviewComponent,
		TodoBoxSamplePreviewComponent,
		TodoBoxSupplierPreviewComponent,
		TeamPerformanceComponent,
	],
	providers: [
		ProductDialogService
	]
})
export class DashboardFeatureModule { }
