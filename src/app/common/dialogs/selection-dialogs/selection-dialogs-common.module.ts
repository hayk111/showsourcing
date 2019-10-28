import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '~shared/shared.module';

import { CrudDialogService } from '../services';
import { ProductAddToProjectDlgComponent } from './product-add-to-project-dlg/product-add-to-project-dlg.component';
import { ProductSelectDlgComponent } from './product-select-dlg/product-select-dlg.component';

const modals = [
	ProductAddToProjectDlgComponent,
	ProductSelectDlgComponent
];

NgModule({
	imports: [
		CommonModule,
		SharedModule
	],
	declarations: modals,
	entryComponents: modals,
	providers: [CrudDialogService]
});
export class SelectionDialogsCommonModule { }
