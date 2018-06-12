import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { DateToTimeAgoPipe } from './pipes/date-ago.pipe';
import { UserNamePipe } from './pipes/user-name.pipe';
import { InfiniScrollDirective } from './directives';
import { ConstPipe } from './pipes/const.pipe';
import { ImagePipe } from '~shared/utils/pipes/image.pipe';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ClickOutsideDirective, DateToTimeAgoPipe, UserNamePipe, InfiniScrollDirective, ConstPipe, ImagePipe],
	exports: [ClickOutsideDirective, DateToTimeAgoPipe, UserNamePipe, InfiniScrollDirective, ConstPipe, ImagePipe]
})
export class UtilsModule { }
