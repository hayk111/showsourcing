import '~shared/icons/font-awesome.config';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconSymbolsComponent } from '~shared/icons/components/icon-symbols/icon-symbols.component';
import { IconComponent } from '~shared/icons/components/icon/icon.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [IconComponent, IconSymbolsComponent],
	exports: [IconComponent, IconSymbolsComponent]
})
export class IconsModule { }
