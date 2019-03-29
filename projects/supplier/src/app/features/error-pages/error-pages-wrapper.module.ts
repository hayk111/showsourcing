import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorPagesModule } from '~features/error-pages/error-pages.module';

@NgModule({
	declarations: [],
	imports: [
		CommonModule
	],
	exports: [ErrorPagesModule]
})
export class ErrorPagesWrapperModule { }
