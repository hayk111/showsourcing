import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Input } from '@angular/core';

import { AppComponent } from './components/app.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { TemplateModule } from '../template/template.module';
import { AuthModule } from '../auth/auth.module';
import { StoreModule } from '@ngrx/store';
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
import { userReducer } from '../../store/reducer/user.reducer';
import { authenticationReducer } from '../../store/reducer/authentication.reducer';
import { countryReducer } from '../../store/reducer/country.reducer';
import { currencyReducer } from '../../store/reducer/currency.reducer';
import { categoryReducer } from '../../store/reducer/category.reducer';
import { teamsReducer } from '../../store/reducer/team.reducer';
import { eventsReducer } from '../../store/reducer/event.reducer';
import { tagReducer } from '../../store/reducer/tag.reducer';
import { projectReducer } from '../../store/reducer/project.reducer';
import { companyReducer } from '../../store/reducer/company.reducer';
import { filtersReducer } from '../../store/reducer/filter.reducer';
import { supplierReducer } from '../../store/reducer/supplier.reducer';
import { viewSwitcherReducer } from '../../store/reducer/view-switcher.reducer';
import { miscReducer } from '../../store/reducer/misc.reducer';
import { productReducer } from '../../store/reducer/product.reducer';
import { taskReducer } from '../../store/reducer/task.reducer';
import { productStatusReducer } from '../../store/reducer/product-status.reducer';


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
		StoreModule.forRoot({
			user: userReducer,
			authentication: authenticationReducer,
			company: companyReducer,
			countries: countryReducer,
			currencies: currencyReducer,
			categories: categoryReducer,
			teams: teamsReducer,
			events: eventsReducer,
			tags: tagReducer,
			projects: projectReducer,
			filters: filtersReducer,
			suppliers: supplierReducer,
			tasks: taskReducer,
			products: productReducer,
			viewSwitcher: viewSwitcherReducer,
			misc: miscReducer,
			productStatus: productStatusReducer
		}),
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
