import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSelectorBadgeComponent } from './components/status-selector-badge/status-selector-badge.component';
import { IconsModule } from '~shared/icons';
import { UtilsModule } from '~shared/utils';
import { SupplierStatusIconComponent } from '~shared/status/components/supplier-status-icon/supplier-status-icon.component';
import { StatusLabelComponent } from './components/status-label/status-label.component';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule],
	declarations: [
		StatusSelectorBadgeComponent,
		SupplierStatusIconComponent,
		StatusLabelComponent
	],
	exports: [StatusSelectorBadgeComponent, SupplierStatusIconComponent, StatusLabelComponent],
})
export class StatusModule {

}
