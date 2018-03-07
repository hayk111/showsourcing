import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CarouselModule } from '~shared/carousel';

import { FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileService, ImageService } from './services';
import { LoadersModule } from '~shared/loaders';
import { EntityModule } from '~entity';

@NgModule({
	imports: [CommonModule, LoadersModule, EntityModule.forChild()],
	declarations: [FileDropDirective, FileSelectDirective, FilesPageComponent],
	exports: [FileDropDirective, FileSelectDirective, FilesPageComponent],
	providers: [FileService, ImageService],
})
export class FileModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FileModule,
			providers: [FileService, ImageService],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: FileModule,
		};
	}
}
