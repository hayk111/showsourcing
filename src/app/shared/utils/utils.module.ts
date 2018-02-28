import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DateToTimeAgoPipe } from './pipes/date-ago.pipe';
import { InfiniScrollDirective } from './directives';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ClickOutsideDirective, DateToTimeAgoPipe, InfiniScrollDirective ],
	exports: [ ClickOutsideDirective, DateToTimeAgoPipe, InfiniScrollDirective ]
})
export class UtilsModule { }
