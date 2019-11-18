import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparisonRowComponent } from './comparison-row/comparison-row.component';
import { InputsModule } from '~shared/inputs';
import { ComparisonRowTemplateDirective } from './comparison-row/comparison-row-template.directive';

@NgModule({
	declarations: [ComparisonRowComponent, ComparisonRowTemplateDirective],
	imports: [
		CommonModule,
		InputsModule
	],
	exports: [ComparisonRowComponent, ComparisonRowTemplateDirective]
})
export class ComparisonRowModule { }
