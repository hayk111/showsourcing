import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './components/home/home.component';
import { FormBuilderModule } from '../../shared/form-builder/form-builder.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardsModule } from '../../shared/cards/cards.module';

@NgModule({
	imports: [
		CommonModule,
		FormBuilderModule,
		NgxChartsModule,
		CardsModule
	],
	declarations: [HomeComponent]
})
export class HomeModule { }
