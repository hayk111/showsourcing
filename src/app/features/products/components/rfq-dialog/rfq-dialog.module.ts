import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogModule } from '~shared/dialog';
import { SharedModule } from '~shared/shared.module';


@NgModule({
	imports: [
		CommonModule,
		DialogModule,
		SharedModule
	]
})
export class RfqDialogModule { }
