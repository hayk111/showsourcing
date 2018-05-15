import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { EditableFieldModule } from '~app/shared/editable-field';
import { CardModule } from '~app/shared/card';
import { SelectorsModule } from '~app/shared/selectors/selectors.module';
import { FormsModule } from '@angular/forms';

@NgModule({
	imports: [
		CommonModule,
		EditableFieldModule,
		CardModule,
		SelectorsModule,
		FormsModule
	],
	declarations: [TestPageComponent],
	exports: [TestPageComponent]
})
export class TestPageModule { }
