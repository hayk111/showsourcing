import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';
import { IconsModule } from '~shared/icons';
import { StatusBadgeComponent } from '~shared/badge/components/status-badge/status-badge.component';
import { StatusBoxComponent } from '~shared/badge/components/status-box/status-box.component';
import { UtilsModule } from '~shared/utils';
import { InfoBadgeComponent } from './components/info-badge/info-badge.component';

@NgModule({
	imports: [CommonModule, IconsModule, UtilsModule],
	declarations: [BadgeComponent, StatusBadgeComponent, StatusBoxComponent, InfoBadgeComponent],
	exports: [BadgeComponent, StatusBadgeComponent, StatusBoxComponent, InfoBadgeComponent],
})
export class BadgeModule { }
