import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent, NewSupplierDlgComponent } from './components';
import { IconsModule } from '../shared/icons/icons.module';
import { AppStoreModule } from '../store/store.module';
import { DialogModule } from '../shared/dialog/dialog.module';
import { UserModule } from '../user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../shared/inputs/inputs.module';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '@modules/suppliers';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  imports: [
		CommonModule,
		StoreModule.forFeature('testEntities', reducers),
		EffectsModule.forFeature(effects),
		IconsModule, // TODO to be removed and placed inside the component module using it
		AppStoreModule.forRoot(), // TODO to be removed and placed inside the component module using it
		DialogModule, // TODO to be removed and placed inside the component module using it
		ReactiveFormsModule, // TODO to be removed and placed inside the component module using it
		InputsModule, // TODO to be removed and placed inside the component module using it
		UserModule // TODO to be removed and placed inside the component module using it
  ],
	declarations: [ SupplierStatusIconComponent, NewSupplierDlgComponent ],
	exports: [ SupplierStatusIconComponent, NewSupplierDlgComponent ]
})
export class SuppliersModule { }
