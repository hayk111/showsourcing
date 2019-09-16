import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ImageModule } from '~shared/image/image.module';

import { IconComponent, LogoComponent } from './components';

@NgModule({
	imports: [
		CommonModule,
		ImageModule
	],
	declarations: [IconComponent, LogoComponent],
	exports: [IconComponent, LogoComponent]
})
export class IconsModule { }
