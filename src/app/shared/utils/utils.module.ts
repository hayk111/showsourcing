import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from '~shared/utils/directives/click-outside.directive';
import { DateToTimeAgoPipe } from '~shared/utils/pipes/date-ago.pipe';
import { UserNamePipe } from '~shared/utils/pipes/user-name.pipe';
import { InfiniScrollDirective } from '~shared/utils/directives';
import { ConstPipe } from '~shared/utils/pipes/const.pipe';
import { GroupByPipe } from '~shared/utils/pipes/groupby.pipe';
import { FileSizePipe } from '~shared/utils/pipes/fileSize.pipe';
import { AutoFocusDirective } from '~shared/utils/directives/auto-focus.directive';

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
		FileSizePipe,
		AutoFocusDirective
	],
	exports: [
		ClickOutsideDirective,
		DateToTimeAgoPipe,
		UserNamePipe,
		InfiniScrollDirective,
		ConstPipe,
		GroupByPipe,
		FileSizePipe,
		AutoFocusDirective
	],
	providers: [
		ConstPipe
	]
})
export class UtilsModule { }
