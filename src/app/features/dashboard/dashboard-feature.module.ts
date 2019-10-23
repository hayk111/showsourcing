import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { ProductDialogService } from '~common/modals/services/product-dialog.service';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';

import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import * as Pages from './pages/dashboard';

@NgModule({
	imports: [
		ChartsModule,
		SharedModule,
		RouterModule.forChild(routes),
		ActivityCommonModule,
		DialogModule,
		TablesCommonModule,
		PreviewsCommonModule
	],
	declarations: [
		Pages.DashboardPageComponent,
		Pages.ActivityComponent,
		Pages.ActivityEmptyComponent,
		Pages.SummaryComponent,
		Pages.TeamCardComponent,
		Pages.DashboardHeaderComponent,
		Pages.LineChartComponent,
		Pages.TodoBoxComponent,
		Pages.TodoNavComponent,
		Pages.TodoBoxTaskPreviewComponent,
		Pages.TodoBoxProductsPreviewComponent,
		Pages.TodoBoxSamplePreviewComponent,
		Pages.TodoBoxSupplierPreviewComponent,
		Pages.TeamPerformanceComponent,
	],
	providers: [
		ProductDialogService
	]
})
export class DashboardFeatureModule { }
