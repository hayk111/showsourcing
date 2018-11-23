import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { UtilsModule } from '~shared/utils/utils.module';

import { ChartComponent, DetailsComponent, LegendComponent } from '~shared/likes-chart/components';
import { LikesCardComponent } from '~shared/likes-chart/containers';

// Module to display likes of an entity with a chart
@NgModule({
	imports: [
		CommonModule,
		UtilsModule,
		LoadersModule,
	],
	declarations: [LegendComponent, ChartComponent, DetailsComponent, LikesCardComponent],
	exports: [LikesCardComponent],
})
export class LikesChartModule { }
