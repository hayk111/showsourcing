import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '~shared/image/pipes/image.pipe';
import { LogoPipe } from '~shared/image/pipes/logo.pipe';
import { ImageComponent } from './components/image/image.component';
import { LogoComponent } from './components/logo/logo.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ImagePipe,
		LogoPipe,
		ImageComponent,
		LogoComponent,
	],
	exports: [ImagePipe, LogoPipe, ImageComponent, LogoComponent]
})
export class ImageModule { }