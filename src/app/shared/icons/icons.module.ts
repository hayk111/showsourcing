import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from './components/icon/icon.component';
import fontawesome from '@fortawesome/fontawesome';
import './font-awesome.config';
import { IconSymbolsComponent } from './components/icon-symbols/icon-symbols.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [IconComponent, IconSymbolsComponent],
	exports: [IconComponent, IconSymbolsComponent]
})
export class IconsModule { }
