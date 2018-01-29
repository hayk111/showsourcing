import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { InputFileComponent } from './components/input-file/input-file.component';
import { InputFileEntityComponent } from './components/input-file-entity/input-file-entity.component';
import { InputImageEntityComponent } from './components/input-image-entity/input-image-entity.component';
import { FilePreviewComponent } from './components/file-preview/file-preview.component';
import { ImgPreviewComponent } from './components/img-preview/img-preview.component';
import { LoadersModule } from '../loaders/loaders.module';

@NgModule({
	imports: [
		CommonModule,
		LoadersModule
	],
	declarations: [ FileDropDirective, FileSelectDirective, InputFileComponent,
		 InputFileEntityComponent, InputImageEntityComponent, FilePreviewComponent, ImgPreviewComponent ],
	exports: [ FileDropDirective, FileSelectDirective, InputFileComponent, FilePreviewComponent, ImgPreviewComponent,
		InputFileEntityComponent, InputImageEntityComponent ],
})
export class FileModule { }
