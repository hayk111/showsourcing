import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardModule } from '../../shared/card/card.module';

@NgModule({
	imports: [
		CommonModule,
		NgxChartsModule,
		CardModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
