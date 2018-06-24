import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '~global-services/product/product.service';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { UserService } from '~global-services/user/user.service';
import { TeamService } from '~global-services/team/team.service';
import { TeamUserService } from '~global-services/team-user/team-user.service';
import { EventService } from '~global-services/event/event.service';
import { CategoryService } from '~global-services/category/category.service';
import { ContactService } from '~global-services/contact/contact.service';
import { ProductStatusService } from '~global-services/product-status/product-status.service';
import { ProjectService } from '~global-services/project/project.service';
import { SupplierTypeService } from '~global-services/supplier-type/supplier-type.service';
import { TagService } from '~global-services/tag/tag.service';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		UserService,
		TeamService,
		ProductService,
		SupplierService,
		TeamUserService,
		EventService,
		CategoryService,
		ContactService,
		ProductStatusService,
		ProjectService,
		SupplierTypeService,
		TagService
	]
})
export class GlobalServicesModule { }
