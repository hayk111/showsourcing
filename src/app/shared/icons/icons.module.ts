import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '~shared/icons/components/icon/icon.component';
import fontawesome from '@fortawesome/fontawesome';
import '~shared/icons/font-awesome.config';
import { IconSymbolsComponent } from '~shared/icons/components/icon-symbols/icon-symbols.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [IconComponent, IconSymbolsComponent],
	exports: [IconComponent, IconSymbolsComponent]
})
export class IconsModule { }
