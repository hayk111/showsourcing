import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';
import { BadgeListComponent } from '~shared/badge/components/badge-list/badge-list.component';
import { IconsModule } from '~shared/icons';
import { StatusBadgeComponent } from '~shared/badge/components/status-badge/status-badge.component';
import { SmartBadgeComponent } from '~shared/badge/components/smart-badge/smart-badge.component';
@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [BadgeComponent, BadgeListComponent, StatusBadgeComponent, SmartBadgeComponent],
	exports: [BadgeComponent, BadgeListComponent, StatusBadgeComponent, SmartBadgeComponent],
})
export class BadgeModule { }
