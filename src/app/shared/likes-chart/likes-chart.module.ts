import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { UtilsModule } from '~shared/utils/utils.module';

import { ChartComponent, DetailsComponent, LegendComponent } from './components';
import { LikesCardComponent } from './containers';
import { UserModule } from '~features/user';

// Module to display likes of an entity with a chart
@NgModule({
	imports: [
		CommonModule,
		UserModule,
		UtilsModule,
		// NgxChartsModule,
		LoadersModule,
	],
	declarations: [LegendComponent, ChartComponent, DetailsComponent, LikesCardComponent],
	exports: [LikesCardComponent],
})
export class LikesChartModule { }
