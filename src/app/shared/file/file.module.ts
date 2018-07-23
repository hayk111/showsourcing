import { ModuleWithProviders, NgModule } from '@angular/core';
import { FilesCardComponent } from '~shared/file/containers';
import { SharedModule } from '~shared/shared.module';

import { FilesPageComponent } from '~shared/file/containers';
import { FileDropDirective } from '~shared/file/directives/file-drop.directive';
import { FileSelectDirective } from '~shared/file/directives/file-select.directive';

@NgModule({
	imports: [SharedModule],
	declarations: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
	exports: [FileDropDirective, FileSelectDirective, FilesPageComponent, FilesCardComponent],
})
export class FileModule {

}
