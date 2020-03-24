import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { CrudDialogService } from '../services/crud-dialog.service';
import { CreationDialogComponent } from './creation-dialog/creation-dialog.component';
import { CreationProductDlgComponent } from './creation-product-dlg/creation-product-dlg.component';
import { CreationSampleDlgComponent } from './creation-sample-dlg/creation-sample-dlg.component';
import { CreationTaskDlgComponent } from './creation-task-dlg/creation-task-dlg.component';

const modals = [
	CreationDialogComponent,
	CreationProductDlgComponent,
	CreationSampleDlgComponent,
	CreationTaskDlgComponent
];

@NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: modals,
	entryComponents: modals,
	providers: []
})
export class CreationDialogsCommonModule { }
