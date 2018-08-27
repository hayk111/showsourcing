import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '~shared/utils/directives/click-outside.directive';
import { DateToTimeAgoPipe } from '~shared/utils/pipes/date-ago.pipe';
import { UserNamePipe } from '~shared/utils/pipes/user-name.pipe';
import { InfiniScrollDirective } from '~shared/utils/directives';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { GroupByPipe } from '~shared/utils/pipes/groupby.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		GroupByPipe,
		InfiniScrollDirective,
		ConstPipe,
	],
	exports: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		InfiniScrollDirective,
		ConstPipe,
		GroupByPipe,
	]
})
export class UtilsModule { }
