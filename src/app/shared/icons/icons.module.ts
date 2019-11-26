import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '~shared/image/image.module';

import { IconComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		ImageModule
	],
	declarations: [IconComponent],
	exports: [IconComponent]
})
export class IconsModule { }
