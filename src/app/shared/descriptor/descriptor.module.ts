import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { SectionComponent } from './components/section/section.component';

@NgModule({
  declarations: [DynamicFormComponent, SectionComponent],
  imports: [
    CommonModule
  ]
})
export class DescriptorModule { }
