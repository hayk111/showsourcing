import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';
import { IconsModule } from '~shared/icons';
import { StatusBadgeComponent } from '~shared/badge/components/status-badge/status-badge.component';
import { UtilsModule } from '~shared/utils';
import { InfoBadgeComponent } from './components/info-badge/info-badge.component';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule],
	declarations: [BadgeComponent, StatusBadgeComponent, InfoBadgeComponent],
	exports: [BadgeComponent, StatusBadgeComponent, InfoBadgeComponent],
})
export class BadgeModule { }
