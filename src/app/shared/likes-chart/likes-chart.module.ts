import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoadersModule } from '~shared/loaders/loaders.module';
import { UtilsModule } from '~shared/utils/utils.module';
import { UserModule } from '~user';

import { ChartComponent, DetailsComponent, LegendComponent } from './components';
import { LikesCardComponent } from './containers';


// Module to display likes of an entity with a chart
@NgModule({
	imports: [
		CommonModule,
		UserModule,
		UtilsModule,
		NgxChartsModule,
		LoadersModule
	],
	declarations: [
		LegendComponent,
		ChartComponent,
		DetailsComponent,
		LikesCardComponent
	],
	exports : [
		LikesCardComponent
	]
})
export class LikesChartModule { }
