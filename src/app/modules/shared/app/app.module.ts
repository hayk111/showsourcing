import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TemplateModule } from '../template/template.module';
import { AuthModule } from '../auth/auth.module';
import { StoreModule, ActionReducer, State } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule, routerReducer } from '@ngrx/router-store';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormBuilderModule } from '../form-builder/form-builder.module';
import { InputComponent } from '../inputs/components/input/input.component';
import { DynamicFormControlComponent } from '../form-builder/components/dynamic-form-control/dynamic-form-control.component';
import { InputAddressComponent } from '../inputs/components/input-address/input-address.component';
import { InputContactComponent } from '../inputs/components/input-contact/input-contact.component';
import { InputMap } from '../form-builder/interfaces/input-map.interface';
import { InputContactListComponent } from '../inputs/components/input-contact-list/input-contact-list.component';
import { LocalStorageModule } from '../local-storage/local-storage.module';
import { CompanyModule } from '../company/company.module';
import { PreloaderModule } from '../preloader/preloader.module';
import { metaReducers, reducers } from '../../store/reducer/_reducers';



const inputMap: InputMap = {
	address: InputAddressComponent,
	contact: InputContactComponent,
	contactList: InputContactListComponent,
	default: InputComponent
};


@NgModule({
	declarations: [
		AppComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		TemplateModule,
		FormBuilderModule.forRoot(inputMap),
		AuthModule.forRoot(),
		LocalStorageModule,
		PreloaderModule,
		CompanyModule,
		StoreModule.forRoot( reducers as any, { metaReducers }),
		StoreDevtoolsModule.instrument({
			maxAge: 2
		}),
		// doesn't yet work with storeDevTools
		// StoreRouterConnectingModule
		BrowserAnimationsModule
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
