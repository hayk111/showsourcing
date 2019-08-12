import '~shared/icons/font-awesome.config';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconSymbolsComponent } from '~shared/icons/components/icon-symbols/icon-symbols.component';
import { IconComponent } from '~shared/icons/components/icon/icon.component';
import { LogoComponent } from './components/logo/logo.component';
import { ImageModule } from '~shared/image/image.module';

@NgModule({
	imports: [
		CommonModule,
		ImageModule
	],
	declarations: [IconComponent, IconSymbolsComponent, LogoComponent],
	exports: [IconComponent, IconSymbolsComponent, LogoComponent]
})
export class IconsModule { }
