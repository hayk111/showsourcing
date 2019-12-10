import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TablesCommonModule } from '~common/tables/tables-common.module';
import { SharedModule } from '~shared/shared.module';

import { CrudDialogService } from '../services/crud-dialog.service';
import { ProductAddToProjectDlgComponent } from './product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductSelectDlgComponent } from './product-select-dlg/product-select-dlg.component';
import { TemplateMngmtDlgComponent } from './template-mngmt-dlg/template-mngmt-dlg.component';

const modals = [
	ProductAddToProjectDlgComponent,
	ProductSelectDlgComponent,
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
