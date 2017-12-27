import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { InputFileComponent } from './components/input-file/input-file.component';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { ImagePreviewDirective } from './components/preview/image-preview.directive';
import { InputFileEntityComponent } from './components/input-file-entity/input-file-entity.component';
import { InputImageEntityComponent } from './components/input-image-entity/input-image-entity.component';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [ FileDropDirective, FileSelectDirective, InputFileComponent, ImgInputComponent, ImagePreviewDirective, InputFileEntityComponent, InputImageEntityComponent ],
	exports: [ FileDropDirective, FileSelectDirective, InputFileComponent, ImgInputComponent ],
})
export class FileModule { }
