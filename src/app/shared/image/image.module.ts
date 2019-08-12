import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagePipe } from '~shared/image/pipes/image.pipe';
import { ImageComponent } from '~shared/image/components/image/image.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [
		ImagePipe,
		ImageComponent,
	],
	exports: [ImagePipe, ImageComponent]
})
export class ImageModule { }
