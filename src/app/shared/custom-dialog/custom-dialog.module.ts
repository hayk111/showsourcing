import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { ProductDialogService } from '~shared/custom-dialog/services';

import {
	CreationDialogComponent,
	EditionDialogComponent,
	MergeDialogComponent,
	ProductAddToProjectDlgComponent,
	ProductExportDlgComponent,
	ProductRequestTeamFeedbackDlgComponent,
} from '~shared/custom-dialog/component';
import { CrudDialogService } from '~shared/custom-dialog/services/crud-dialog.service';
import { FindProductDialogComponent } from './component/find-product-dialog/find-product-dialog.component';

@NgModule({
	imports: [
		CommonModule,
		DialogModule,
		SharedModule
	],
	declarations: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		FindProductDialogComponent
	],
	entryComponents: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent
	],
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class CustomDialogModule { }
