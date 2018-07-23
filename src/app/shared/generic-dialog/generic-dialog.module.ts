import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationDialogComponent } from '~shared/generic-dialog/component/creation-dialog/creation-dialog.component';
import { EditionDialogComponent } from '~shared/generic-dialog/component/edition-dialog/edition-dialog.component';
import { MergeDialogComponent } from '~shared/generic-dialog/component/merge-dialog/merge-dialog.component';
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
	declarations: [CreationDialogComponent, EditionDialogComponent, MergeDialogComponent]

})
export class GenericDialogModule { }
