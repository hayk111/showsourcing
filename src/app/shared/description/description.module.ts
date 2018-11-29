import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionComponent } from '~shared/description/components/description/description.component';
import { InputsModule } from '~shared/inputs';
import { DynamicFormsModule } from '~shared/dynamic-forms';
import { SharedModule } from '~shared/shared.module';

@NgModule({
	imports: [CommonModule, InputsModule, DynamicFormsModule, SharedModule],
	declarations: [DescriptionComponent],
	exports: [DescriptionComponent]
})
export class DescriptionModule { }
