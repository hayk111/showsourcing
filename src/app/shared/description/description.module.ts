import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DescriptionComponent } from '~shared/description/components/description/description.component';
import { InputsModule } from '~shared/inputs';
import { DynamicFormsModule } from '~shared/dynamic-forms';

@NgModule({
	imports: [CommonModule, InputsModule, DynamicFormsModule],
	declarations: [DescriptionComponent],
	exports: [DescriptionComponent]
})
export class DescriptionModule {}
