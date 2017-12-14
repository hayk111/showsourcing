import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ ClickOutsideDirective, FileDropDirective, FileSelectDirective ],
	exports: [ ClickOutsideDirective, FileDropDirective, FileSelectDirective ]
})
export class UtilsModule { }
