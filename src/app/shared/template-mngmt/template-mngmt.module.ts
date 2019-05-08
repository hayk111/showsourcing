import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TemplateMngmtDlgComponent } from './components/template-mngmt-dlg/template-mngmt-dlg.component';
import { DialogModule } from '~shared/dialog';
import { ListModule } from '~shared/list/list.module';
import { InputsModule } from '~shared/inputs';

@NgModule({
	declarations: [TemplateMngmtDlgComponent],
	imports: [
		CommonModule,
		DialogModule,
		ListModule,
		InputsModule
	],
	exports: [TemplateMngmtDlgComponent],
	entryComponents: [TemplateMngmtDlgComponent]
})
export class TemplateMngmtModule { }
