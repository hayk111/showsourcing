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

const components = [ InputComponent, InputAddressComponent, InputContactComponent,
											InputContactListComponent, InputCountryComponent ];

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatIconModule
	],
	declarations: components,
	entryComponents: components,
	exports: components,
})
export class InputsModule { }
