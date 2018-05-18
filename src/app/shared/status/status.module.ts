import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusSelectorBadgeComponent } from './components/status-selector-badge/status-selector-badge.component';
import { IconsModule } from '~app/shared/icons';
import { UtilsModule } from '~app/shared/utils';
import { SupplierStatusIconComponent } from '~app/shared/status/components/supplier-status-icon/supplier-status-icon.component';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule],
	declarations: [StatusSelectorBadgeComponent, SupplierStatusIconComponent],
	exports: [StatusSelectorBadgeComponent, SupplierStatusIconComponent],
	providers: []
})
export class StatusModule {

}
