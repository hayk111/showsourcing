import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSelectorBadgeComponent } from './components/status-selector-badge/status-selector-badge.component';
import { IconsModule } from '~app/shared/icons';
import { EntityModule } from '~app/shared/entity';
import { UtilsModule } from '~app/shared/utils';

@NgModule({
	imports: [CommonModule, IconsModule, EntityModule, UtilsModule],
	declarations: [StatusSelectorBadgeComponent],
	exports: [StatusSelectorBadgeComponent],
})
export class StatusModule {
	static forChild(): ModuleWithProviders {
		return {
			ngModule: StatusModule,
		};
	}
}
