import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DateToTimeAgoPipe } from './pipes/date-ago.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { InfiniScrollDirective } from './directives';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ClickOutsideDirective, DateToTimeAgoPipe, UserNamePipe, InfiniScrollDirective ],
	exports: [ ClickOutsideDirective, DateToTimeAgoPipe, UserNamePipe, InfiniScrollDirective ]
})
export class UtilsModule { }
