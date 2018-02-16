import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupplierStatusIconComponent } from './components/supplier-status-icon/supplier-status-icon.component';
import { IconsModule } from '../icons/icons.module';
import { AppStoreModule } from '../../store/store.module';
import { NewSupplierDlgComponent } from './components/new-supplier-dlg/new-supplier-dlg.component';
import { DialogModule } from '../dialog/dialog.module';
import { UserModule } from '../user/user.module';
import { ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '../inputs/inputs.module';

@NgModule({
  imports: [
		CommonModule,
		IconsModule,
		AppStoreModule.forRoot(),
		DialogModule,
		ReactiveFormsModule,
		InputsModule,
		UserModule
  ],
	declarations: [ SupplierStatusIconComponent, NewSupplierDlgComponent ],
	exports: [ SupplierStatusIconComponent, NewSupplierDlgComponent ]
})
export class SuppliersModule { }
