import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FilesCardComponent } from '~app/shared/file/containers';
import { IconsModule } from '~app/shared/icons';
import { LoadersModule } from '~shared/loaders';

import { FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';
import { SharedModule } from '~app/shared/shared.module';

@NgModule({
	imports: [SharedModule],
	declarations: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
	exports: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
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
