import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { ActivityCommonModule } from '~common/activity/activity-common.module';
import { CatalogCommonModule } from '~common/catalogs/catalog-common.module';
import { ProductDialogService } from '~common/dialogs/services/product-dialog.service';
import { PreviewsCommonModule } from '~common/previews/previews-common.module';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { routes } from '~features/dashboard/routes';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { HeaderModule } from '~core/header/header.module';
import { ImageModule } from '~shared/image/image.module';

import * as Components from './pages/dashboard/components';
import * as Pages from './pages/dashboard/dashboard-page.component';

@NgModule({
	imports: [
		ChartsModule,
		SharedModule,
		RouterModule.forChild(routes),
		ActivityCommonModule,
		DialogModule,
		TablesCommonModule,
		PreviewsCommonModule,
		CatalogCommonModule,
		HeaderModule,
		ImageModule,
	],
	declarations: [
		Pages.DashboardPageComponent,
		Components.ActivityComponent,
		Components.ActivityEmptyComponent,
		Components.SummaryComponent,
		Components.TeamCardComponent,
		Components.DashboardHeaderComponent,
		Components.DashboardDownloadComponent,
		Components.ProductListComponent,
		Components.LineChartComponent,
		Components.LatestProductsComponent,
		Components.TodoBoxComponent,
		Components.TodoNavComponent,
		Components.TodoBoxTaskPreviewComponent,
		Components.TodoBoxProductsPreviewComponent,
		Components.TodoBoxSamplePreviewComponent,
		Components.TodoBoxSupplierPreviewComponent,
		Components.TeamPerformanceComponent,
	],
	providers: [
		ProductDialogService
	]
})
export class DashboardFeatureModule { }
