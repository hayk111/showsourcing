import { NgModule } from '@angular/core';
import { StatusSelectorComponent } from './component/status-selector.component';
import { StatusSelectorService } from './service/status-selector.service';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { BadgeModule } from '~shared/badge';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { DividerModule } from '~shared/divider/divider.module';

@NgModule({
	imports: [
		CommonModule,
		ContextMenuModule,
		BadgeModule,
		IconsModule,
		UtilsModule,
		DividerModule
	],
	declarations: [StatusSelectorComponent],
	exports: [StatusSelectorComponent],
	// TODO Uncomment when fixed problem with pages
	providers: [
		StatusSelectorService
	]
})
export class StatusSelectorModule { }
