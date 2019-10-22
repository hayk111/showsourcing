import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SampleCardComponent } from './sample-card/sample-card.component';


@NgModule({
	imports: [
		CommonModule,
	],
	declarations: [
		SampleCardComponent,
	],
	exports: [
		SampleCardComponent,
	],
	entryComponents: []
})
export class CardsCommonModule { }
