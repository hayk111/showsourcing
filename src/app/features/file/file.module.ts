import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { CarouselModule } from '~shared/carousel';

import { FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { FileService, ImageService } from './services';
import { LoadersModule } from '~shared/loaders';
import { EntityModule } from '~entity';
import { FilesCardComponent } from '~app/features/file/containers/files-card/files-card.component';
import { IconsModule } from '~app/shared/icons';

@NgModule({
	imports: [CommonModule, LoadersModule, EntityModule.forChild(), IconsModule],
	declarations: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
	exports: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
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
