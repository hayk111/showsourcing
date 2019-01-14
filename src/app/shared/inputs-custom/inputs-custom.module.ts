import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from '~shared/badge';
import { EditableFieldModule } from '~shared/editable-field';
import { IconsModule } from '~shared/icons';
import { InputsModule } from '~shared/inputs';
import { InputPriceComponent } from '~shared/inputs-custom/components/input-price/input-price.component';
import { SelectorsModule } from '~shared/selectors/selectors.module';
import { UtilsModule } from '~shared/utils';

import { InputBadgeSelectorComponent } from './components/input-badge-selector/input-badge-selector.component';
import { InputDescriptionComponent } from './components/input-description/input-description.component';
import { InputPriceInlineComponent } from './components/input-price-inline/input-price-inline.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		SelectorsModule,
		IconsModule,
		UtilsModule,
		InputsModule,
		EditableFieldModule,
		BadgeModule
	],
	declarations: [InputPriceComponent, InputPriceInlineComponent, InputDescriptionComponent, InputBadgeSelectorComponent],
	exports: [InputPriceComponent, InputPriceInlineComponent, InputDescriptionComponent, InputBadgeSelectorComponent]
})
export class InputsCustomModule { }
