import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconsStatusComponent } from '~shared/status/components/icons-status/icons-status.component';
import { IconsModule } from '~shared/icons/icons.module';

@NgModule({
	imports: [
		CommonModule,
		IconsModule
	],
	declarations: [IconsStatusComponent],
	exports: [IconsStatusComponent]
})
export class StatusModule { }
