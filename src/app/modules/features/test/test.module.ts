import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { BaseComponent } from './base/base.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';
import { FiltersModule } from '../../shared/filters/filters.module';
import { DynamicFormsModule } from '../../shared/dynamic-forms/dynamic-forms.module';
import { TestInputsCustomComponent } from './components/test-inputs-custom/test-inputs-custom.component';
import { TestInputsFileComponent } from './components/test-inputs-file/test-inputs-file.component';
import { TestInputsSelectorsComponent } from './components/test-inputs-selectors/test-inputs-selectors.component';
import { TestInputsVanillaComponent } from './components/test-inputs-vanilla/test-inputs-vanilla.component';
import { RouterModule } from '@angular/router';

@NgModule({
	imports: [
		CommonModule,
		InputsModule,
		DynamicFormsModule,
		ReactiveFormsModule,
		RouterModule.forChild([])
	],
	declarations: [TestComponent, BaseComponent, TestInputsCustomComponent,
		 TestInputsFileComponent, TestInputsSelectorsComponent, TestInputsVanillaComponent],
})
export class TestModule { }
