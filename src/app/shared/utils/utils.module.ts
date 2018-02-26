import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DateToTimeAgoPipe } from './pipes/date-ago.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ClickOutsideDirective, DateToTimeAgoPipe ],
	exports: [ ClickOutsideDirective, DateToTimeAgoPipe ]
})
export class UtilsModule { }
