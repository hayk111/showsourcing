import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService, TeamService } from '~shared/global-services';
import { ProductService } from '~shared/global-services/product/product.service';
import { SupplierService } from '~shared/global-services/supplier/supplier.service';

@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [UserService, TeamService, ProductService, SupplierService]
})
export class GlobalServicesModule { }
