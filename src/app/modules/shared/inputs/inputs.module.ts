import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '../utils/utils.module';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { InputComponent } from './components/vanilla/input/input.component';
import { RatingInputComponent } from './components/custom/rating-input/rating-input.component';
import { ImagePreviewDirective } from './components/custom/input-image/preview/image-preview.directive';
import { FeedbackInputComponent } from './components/custom/feedback-input/feedback-input.component';
import { CommentsInputComponent } from './components/custom/comments-input/comments-input.component';
import { InputCurrencyComponent } from './components/custom/input-currency/input-currency.component';
import { InputPriceComponent } from './components/custom/input-price/input-price.component';
import { FileInputComponent } from './components/custom/file-input/file-input.component';
import { ImgInputComponent } from './components/custom/img-input/img-input.component';
import { InputRadioComponent } from './components/vanilla/input-radio/input-radio.component';
import { InputCheckboxComponent } from './components/vanilla/input-checkbox/input-checkbox.component';
import { InputTextareaComponent } from './components/vanilla/input-textarea/input-textarea.component';
import { InputSelectOneComponent } from './components/custom/select/input-select-one/input-select-one.component';
import { InputSelectMultiComponent } from './components/custom/select/input-select-multi/input-select-multi.component';
import { InputSelectEntityComponent } from './components/custom/select/input-select-entity/input-select-entity.component';
import { SearchableListComponent } from './components/custom/select/searchable-list/searchable-list.component';

export const components = [
											// vanilla inputs
											InputComponent,
											InputTextareaComponent,
											InputRadioComponent,
											InputCheckboxComponent,
											// used in dynamic forms
											InputCurrencyComponent,
											InputPriceComponent,
											// not used in dynamic forms,
											// should be removed from here
											ImagePreviewDirective,
											FeedbackInputComponent,
											CommentsInputComponent,
											// Might make sens to have those here too
											RatingInputComponent,
											FileInputComponent,
											ImgInputComponent,
											// selects
											InputSelectOneComponent,
											InputSelectMultiComponent,
											InputSelectEntityComponent,
											SearchableListComponent
											];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		UtilsModule,
		MatIconModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
