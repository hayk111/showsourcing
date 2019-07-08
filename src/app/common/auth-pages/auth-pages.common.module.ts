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
import { AuthHeaderContentComponent } from './components/auth-header/auth-header-content.component';

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
		AuthHeaderContentComponent
	],
	exports: [
		AuthFormBaseComponent,
		AuthFormHeaderComponent,
		AuthHeaderSubtitleComponent,
		AuthHeaderTitleComponent,
		AuthHeaderContentComponent
	],
})
export class AuthPagesCommonModule { }
