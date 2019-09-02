import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponent } from '~shared/icons/components/icon/icon.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [IconComponent],
	exports: [IconComponent]
})
export class IconsModule { }
