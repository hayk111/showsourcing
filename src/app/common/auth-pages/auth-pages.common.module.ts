import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '~shared/shared.module';

import {
	AuthFormBaseComponent,
	AuthFormHeaderComponent,
	AuthHeaderSubtitleComponent,
	AuthHeaderTitleComponent,
} from './components';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		SharedModule
	],
	declarations: [
		AuthFormBaseComponent,
		AuthFormHeaderComponent,
		AuthHeaderSubtitleComponent,
		AuthHeaderTitleComponent,
	],
	exports: [
		AuthFormBaseComponent,
		AuthFormHeaderComponent,
		AuthHeaderSubtitleComponent,
		AuthHeaderTitleComponent,
	],
})
export class AuthPagesCommonModule { }
