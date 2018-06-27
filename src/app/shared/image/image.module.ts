import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '~shared/image/pipes/image.pipe';
import { LogoPipe } from '~shared/image/pipes/logo.pipe';
import { ImageComponent } from './components/image/image.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ImagePipe,
		LogoPipe,
		ImageComponent,
	],
	exports: [ImagePipe, LogoPipe, ImageComponent]
})
export class ImageModule { }
