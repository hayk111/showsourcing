import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditableFieldModule } from '~shared/editable-field/editable-field.module';
import { InputsModule } from '~shared/inputs/inputs.module';

import { DataMananagementTableComponent } from './components';
import { DataManagementPageComponent } from './containers';
import { routes } from './routes';
import { SharedModule } from '~app/shared/shared.module';
import { SideMenuModule } from '~app/shared/side-menu/side-menu.module';
import { EditableTextComponent } from './components/editable-text/editable-text.component';

@NgModule({
	imports: [
		SharedModule,
		RouterModule.forChild([]),
		EditableFieldModule,
		SideMenuModule
	],
	declarations: [DataManagementPageComponent, DataMananagementTableComponent, EditableTextComponent],
	exports: [DataManagementPageComponent],
})
export class DataManagementModule {
	static forRoot(): ModuleWithProviders {
		return {
			ngModule: DataManagementModule,
		};
	}
}
