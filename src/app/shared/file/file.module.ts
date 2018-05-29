import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FilesCardComponent } from '~shared/file/containers';
import { IconsModule } from '~shared/icons';
import { LoadersModule } from '~shared/loaders';

import { FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { SharedModule } from '~shared/shared.module';
import { ImagePipe } from './pipes/image.pipe';

@NgModule({
	imports: [SharedModule],
	declarations: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent, ImagePipe],
	exports: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent, ImagePipe],
	providers: [],
})
export class FileModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: FileModule,
			providers: [],
		};
	}

	static forChild(): ModuleWithProviders {
		return {
			ngModule: FileModule,
		};
	}
}
