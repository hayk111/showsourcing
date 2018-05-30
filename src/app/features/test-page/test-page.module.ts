import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { EditableFieldModule } from '~shared/editable-field';
import { CardModule } from '~shared/card';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { FormsModule } from '@angular/forms';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
	imports: [
		CommonModule,
		EditableFieldModule,
		CardModule,
		SelectorsModule,
		FormsModule,
		DynamicFormsModule,
		NgSelectModule,

	],
	declarations: [TestPageComponent],
	exports: [TestPageComponent]
})
export class TestPageModule { }
