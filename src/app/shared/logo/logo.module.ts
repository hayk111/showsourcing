import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FileModule } from '~shared/file';
import { IconsModule } from '~shared/icons';
import { ImageModule } from '~shared/image/image.module';

import { InitialsLogoComponent } from './initials-logo/initials-logo.component';
import { LogoNavComponent } from './logo-nav/logo-nav.component';
import { LogoComponent } from './logo/logo.component';

@NgModule({
	imports: [
		CommonModule,
		IconsModule,
		ImageModule,
		FileModule,
	],
	declarations: [
		LogoComponent,
		LogoNavComponent,
		InitialsLogoComponent,
	],
	exports: [
		LogoComponent,
		LogoNavComponent,
		InitialsLogoComponent,
	]
})
export class LogoModule { }
