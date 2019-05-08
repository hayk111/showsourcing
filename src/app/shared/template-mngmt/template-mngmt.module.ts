import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateMngmtDlgComponent } from './components/template-mngmt-dlg/template-mngmt-dlg.component';
import { DialogModule } from '~shared/dialog';

@NgModule({
	declarations: [TemplateMngmtDlgComponent],
	imports: [
		CommonModule,
		DialogModule
	],
	exports: [TemplateMngmtDlgComponent],
	entryComponents: [TemplateMngmtDlgComponent]
})
export class TemplateMngmtModule { }
