import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { ProductCommonModule } from '~common/product';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { ActivityEmptyComponent } from '~features/dashboard/components/activity/activity-empty/activity-empty.component';
import { ActivityComponent } from '~features/dashboard/components/activity/activity.component';
import { DashboardHeaderComponent } from '~features/dashboard/components/dashboard-header/dashboard-header.component';
import { LineChartComponent } from '~features/dashboard/components/line-chart/line-chart.component';
import { SummaryComponent } from '~features/dashboard/components/summary/summary.component';
import { TeamCardComponent } from '~features/dashboard/components/team-card/team-card.component';
import { TeamPerformanceComponent } from '~features/dashboard/components/team-performance/team-performance.component';
import {
	TodoBoxProductsPreviewComponent,
	TodoBoxSamplePreviewComponent,
	TodoBoxSupplierPreviewComponent,
	TodoBoxTaskPreviewComponent,
} from '~features/dashboard/components/todo-box/todo-box-tables';
import { TodoBoxComponent } from '~features/dashboard/components/todo-box/todo-box.component';
import { TodoNavComponent } from '~features/dashboard/components/todo-box/todo-nav/todo-nav.component';
import { DashboardComponent } from '~features/dashboard/containers/dashboard/dashboard.component';
import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [
		ChartsModule,
		SharedModule,
		RouterModule.forChild(routes),
		ActivityCommonModule,
		DialogModule,
		ProductCommonModule,
		TablesCommonModule,
		PreviewsCommonModule
	],
	declarations: [
		DashboardComponent,
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
export class DashboardModule { }
