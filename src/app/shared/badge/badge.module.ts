import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BadgeComponent } from '~shared/badge/components/badge/badge.component';
import { IconsModule } from '~shared/icons';
import { StatusBadgeComponent } from '~shared/badge/components/status-badge/status-badge.component';

@NgModule({
	imports: [CommonModule, IconsModule],
	declarations: [BadgeComponent, StatusBadgeComponent],
	exports: [BadgeComponent, StatusBadgeComponent],
})
export class BadgeModule { }
