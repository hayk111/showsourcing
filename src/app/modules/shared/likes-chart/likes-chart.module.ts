import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegendComponent } from './components/legend/legend.component';
import { ChartComponent } from './components/chart/chart.component';
import { DetailsComponent } from './components/details/details.component';
import { LikesCardComponent } from './components/likes-card/likes-card.component';
import { UserModule } from '../../user/user.module';
import { UtilsModule } from '../utils/utils.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { LoadersModule } from '../loaders/loaders.module';


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
