import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { DefaultCreationDialogComponent } from './default-creation-dialog/default-creation-dialog.component';

import * as modals from './index';

const dialogs = [DefaultCreationDialogComponent];

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: Object.values(modals),
	entryComponents: [ DefaultCreationDialogComponent ],
	providers: []
})
export class CreationDialogsCommonModule { }
