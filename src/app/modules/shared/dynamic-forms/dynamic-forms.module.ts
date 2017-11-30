import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormGroupComponent } from './components/dynamic-form-group/dynamic-form-group.component';
import { DynamicFormControlComponent } from './components/dynamic-form-control/dynamic-form-control.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [DynamicFormGroupComponent, DynamicFormControlComponent]
})
export class DynamicFormsModule { }
