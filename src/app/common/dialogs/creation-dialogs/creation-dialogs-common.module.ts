import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import * as modals from './index';


@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: Object.values(modals),
	entryComponents: Object.values(modals),
	providers: []
})
export class CreationDialogsCommonModule { }
