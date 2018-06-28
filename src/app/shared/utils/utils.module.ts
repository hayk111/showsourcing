import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DateToTimeAgoPipe } from './pipes/date-ago.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { InfiniScrollDirective } from './directives';
import { ConstPipe } from './pipes/const.pipe';
@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		InfiniScrollDirective,
		ConstPipe,
	],
	exports: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		InfiniScrollDirective,
		ConstPipe,
	]
})
export class UtilsModule { }
