import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationDialogComponent, EditionDialogComponent, MergeDialogComponent, ProductAddToProjectDlgComponent, ProductRequestTeamFeedbackDlgComponent, ProductExportDlgComponent } from './component'
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';
import { BadgeModule } from '~shared/badge';
import { ReactiveFormsModule } from '@angular/forms';
import { ERMService } from '~global-services/_global/erm.service';

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
		ProductExportDlgComponent
	],
	entryComponents: [
		CreationDialogComponent,
		EditionDialogComponent,
		MergeDialogComponent,
		ProductAddToProjectDlgComponent,
		ProductRequestTeamFeedbackDlgComponent,
		ProductExportDlgComponent
	]

})
export class CustomDialogModule { }
