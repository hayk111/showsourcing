import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonRowComponent } from './comparison-row/comparison-row.component';
import { InputsModule } from '~shared/inputs';

@NgModule({
	declarations: [ComparisonRowComponent],
	imports: [
		CommonModule,
		InputsModule
	],
	exports: [ComparisonRowComponent]
})
export class ComparisonRowModule { }
