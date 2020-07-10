import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import * as modals from './index';
import { DefaultCreationDialogComponent } from './default-creation-dialog/default-creation-dialog.component';

const dialogs = [ DefaultCreationDialogComponent ];

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: Object.values(modals),
	entryComponents: [dialogs],
	providers: []
})
export class CreationDialogsCommonModule { }
