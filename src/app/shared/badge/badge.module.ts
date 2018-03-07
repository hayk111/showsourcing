import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BadgeComponent } from './components/badge/badge.component';

@NgModule({
	imports: [CommonModule],
	declarations: [BadgeComponent],
	exports: [BadgeComponent],
})
export class BadgeModule {}
