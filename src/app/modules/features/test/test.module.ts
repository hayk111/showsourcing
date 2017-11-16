import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestComponent } from './test/test.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilderModule } from '../../shared/form-builder/form-builder.module';
import { InputsModule } from '../../shared/inputs/inputs.module';
import { BaseComponent } from './base/base.component';
import { FilteredListPageModule } from '../../shared/filtered-list-page/filtered-list-page.module';

@NgModule({
  imports: [
    CommonModule,
    FormBuilderModule,
		ReactiveFormsModule,
		FilteredListPageModule
  ],
  declarations: [TestComponent, BaseComponent],
})
export class TestModule { }
