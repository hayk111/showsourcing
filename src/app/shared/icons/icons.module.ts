import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconComponent } from '~shared/icons/components/icon/icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [
		CommonModule,
		ImageModule
	],
	declarations: [IconComponent, LogoComponent],
	exports: [IconComponent, LogoComponent]
})
export class IconsModule { }
