import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';
import { DefaultCreationDialogComponent } from './default-creation-dialog/default-creation-dialog.component';
import * as modals from './index';
import {
		SampleCreationDialogComponent
} from './sample-creation-dialog/sample-creation-dialog.component';

const dialogs = [ DefaultCreationDialogComponent, SampleCreationDialogComponent ];

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
