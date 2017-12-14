import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardsModule } from '../../shared/cards/cards.module';

@NgModule({
	imports: [
		CommonModule,
		NgxChartsModule,
		CardsModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
