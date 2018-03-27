import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FilesCardComponent } from '~app/shared/file/containers';
import { IconsModule } from '~app/shared/icons';
import { EntityModule } from '~entity';
import { LoadersModule } from '~shared/loaders';

import { FilesPageComponent } from './containers';
import { FileDropDirective } from './directives/file-drop.directive';
import { FileSelectDirective } from './directives/file-select.directive';

@NgModule({
	imports: [CommonModule, LoadersModule, EntityModule.forChild(), IconsModule],
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
