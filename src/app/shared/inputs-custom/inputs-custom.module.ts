import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputPriceComponent } from '~shared/inputs-custom/components/input-price/input-price.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';
import { InputsModule } from '~shared/inputs';
import { InputPriceInlineComponent } from './components/input-price-inline/input-price-inline.component';
import { IconsModule } from '~shared/icons';
import { InputDescriptionComponent } from './components/input-description/input-description.component';
import { EditableFieldModule } from '~shared/editable-field';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectorsModule,
		IconsModule,
		UtilsModule,
		InputsModule,
		EditableFieldModule
	],
	declarations: [InputPriceComponent, InputPriceInlineComponent, InputDescriptionComponent],
	exports: [InputPriceComponent, InputPriceInlineComponent, InputDescriptionComponent]
})
export class InputsCustomModule { }
