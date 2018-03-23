import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSelectorBadgeComponent } from './components/status-selector-badge/status-selector-badge.component';
import { IconsModule } from '~app/shared/icons';
import { EntityModule } from '~app/shared/entity';

@NgModule({
	imports: [CommonModule, IconsModule, EntityModule],
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
