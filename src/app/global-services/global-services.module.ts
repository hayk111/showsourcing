import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '~global-services/product/product.service';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { UserApolloService } from '~global-services/user/user.apollo.service';
import { TeamService } from '~global-services/team/team.service';
import { TeamUserService } from '~global-services/team-user/team-user.service';
import { EventService } from '~global-services/event/event.service';
import { CategoryService } from '~global-services/category/category.service';
import { ContactService } from '~global-services/contact/contact.service';
import { ProductStatusService } from '~global-services/product-status/product-status.service';
import { ProjectService } from '~global-services/project/project.service';
import { SupplierTypeService } from '~global-services/supplier-type/supplier-type.service';
import { TagService } from '~global-services/tag/tag.service';
import {
	ImageUploadRequestService
} from '~global-services/image-upload-request/image-upload-request.service';
import { FileUploadRequestService } from '~global-services/file-upload-request/file-upload-request.service';
import { ERMService } from '~global-services/_global/erm.service';
import { UserService } from '~global-services/user/user.service';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
		UserApolloService,
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
		TagService,
		ImageUploadRequestService,
		FileUploadRequestService,
		ERMService,
		UserService
	]
})
export class GlobalServicesModule { }
