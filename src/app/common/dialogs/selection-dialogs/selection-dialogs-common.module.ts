import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import { CrudDialogService } from '../services/crud-dialog.service';
import { ProjectSelectionDialogComponent } from './project-selection-dialog/project-selection-dialog.component'
import { ProductSelectionDialogComponent } from './product-selection-dialog/product-selection-dialog.component';
import { TemplateMngmtDlgComponent } from './template-mngmt-dlg/template-mngmt-dlg.component';

const modals = [
	ProjectSelectionDialogComponent,
	ProductSelectionDialogComponent,
	TemplateMngmtDlgComponent

];

@NgModule({
	imports: [
		CommonModule,
		SharedModule,
		TablesCommonModule
	],
	declarations: modals,
	entryComponents: modals,
	providers: [CrudDialogService]
})
export class SelectionDialogsCommonModule { }
