import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { DialogModule } from '~shared/dialog';
import { InputsModule } from '~shared/inputs';
import { ListModule } from '~shared/list/list.module';
import { LoadersModule } from '~shared/loaders';
import { TranslateModule } from '@ngx-translate/core';

import { TemplateMngmtDlgComponent } from './components/template-mngmt-dlg/template-mngmt-dlg.component';

@NgModule({
	declarations: [TemplateMngmtDlgComponent],
	imports: [
		CommonModule,
		DialogModule,
		ListModule,
		InputsModule,
		ReactiveFormsModule,
		ContextMenuModule,
		LoadersModule,
		TranslateModule
	],
	exports: [TemplateMngmtDlgComponent],
	entryComponents: [TemplateMngmtDlgComponent]
})
export class TemplateMngmtModule { }
