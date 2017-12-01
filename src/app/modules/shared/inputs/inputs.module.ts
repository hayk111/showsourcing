import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputAddressComponent } from './components/input-address/input-address.component';
import { FormBuilderModule } from '../form-builder/form-builder.module';
import { InputContactComponent } from './components/input-contact/input-contact.component';
import { InputContactListComponent } from './components/input-contact-list/input-contact-list.component';
import { InputCountryComponent } from './components/input-country/input-country.component';
import { MatIconModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { EntitySelectInputComponent } from './components/entity-select-input/entity-select-input.component';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { RatingInputComponent } from './components/rating-input/rating-input.component';

const components = [ InputComponent, InputAddressComponent, InputContactComponent,
											InputContactListComponent, InputCountryComponent, EntitySelectInputComponent,
											RatingInputComponent ];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule,
		MatInputModule,
		MatSelectModule,
		MatAutocompleteModule
	],
	declarations: components,
	entryComponents: components,
	exports: components,
})
export class InputsModule { }
