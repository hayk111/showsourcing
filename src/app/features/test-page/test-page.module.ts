import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from '~features/test-page/test-page/test-page.component';
import { EditableFieldModule } from '~shared/editable-field';
import { CardModule } from '~shared/card';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { FormsModule } from '@angular/forms';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContextMenuModule } from '~shared/context-menu/context-menu.module';
import { IconsModule } from '~shared/icons';
import { DividerModule } from '~shared/divider/divider.module';
import { UserPictureModule } from '~shared/user-picture';
import { SearchBarModule } from '~shared/search-bar-animated/search-bar.module';
import { InputsModule } from '~shared/inputs';

@NgModule({
	imports: [
		CommonModule,
		EditableFieldModule,
		CardModule,
		SelectorsModule,
		FormsModule,
		DynamicFormsModule,
		NgSelectModule,
		IconsModule,
		ContextMenuModule,
		DividerModule,
		UserPictureModule,
		SearchBarModule,
		InputsModule
	],
	declarations: [TestPageComponent],
	exports: [TestPageComponent]
})
export class TestPageModule { }
