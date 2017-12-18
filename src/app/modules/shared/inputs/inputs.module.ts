import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { EntitySelectInputComponent } from './components/entity-select-input/entity-select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RatingInputComponent } from './components/rating-input/rating-input.component';
import { ImagePreviewDirective } from './components/input-image/preview/image-preview.directive';
import { FeedbackInputComponent } from './components/feedback-input/feedback-input.component';
import { CommentsInputComponent } from './components/comments-input/comments-input.component';
import { TextareaInputComponent } from './components/textarea-input/textarea-input.component';
import { InputCurrencyComponent } from './components/input-currency/input-currency.component';
import { InputPriceComponent } from './components/input-price/input-price.component';
import { FileInputComponent } from './components/file-input/file-input.component';
import { UtilsModule } from '../utils/utils.module';
import { ImgInputComponent } from './components/img-input/img-input.component';
import { StoreModule } from '@ngrx/store/src/store_module';
import { AppStoreModule } from '../../store/store.module';
import { InputRadioComponent } from './components/input-radio/input-radio.component';

const components = [ InputComponent, InputAddressComponent, EntitySelectInputComponent,
											RatingInputComponent, ImagePreviewDirective,
											FeedbackInputComponent, CommentsInputComponent, TextareaInputComponent,
											InputCurrencyComponent, InputPriceComponent, FileInputComponent, ImgInputComponent,
											InputRadioComponent ];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		UtilsModule,
		AppStoreModule.forChild(),
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatAutocompleteModule,
	],
	declarations: components,
	// entryComponents: components,
	exports: components,
})
export class InputsModule { }
