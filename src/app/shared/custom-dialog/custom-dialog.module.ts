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
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { RfqDialogComponent } from './component/rfq-dialog/rfq-dialog.component';
import { EmailListComponent } from './component/rfq-dialog/email-list/email-list.component';
import { StageIndicatorModule } from '~shared/stage-indicator/stage-indicator.module';
import { CarouselModule } from '~shared/carousel';

@NgModule({
	imports: [
		CommonModule,
		DialogModule,
		SharedModule,
		SearchBarModule,
		StageIndicatorModule,
		CarouselModule
	],
	declarations: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		EmailListComponent,
		RfqDialogComponent
	],
	entryComponents: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent,
		RfqDialogComponent
	],
	providers: [
		ProductDialogService,
		CrudDialogService
	]
})
export class CustomDialogModule { }
