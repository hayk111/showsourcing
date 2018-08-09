import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '~global-services/product/product.service';
import { SupplierService } from '~global-services/supplier/supplier.service';
import { TeamService } from '~global-services/team/team.service';
import { TeamUserService } from '~global-services/team-user/team-user.service';
import { EventService } from '~global-services/event/event.service';
import { CategoryService } from '~global-services/category/category.service';
import { ContactService } from '~global-services/contact/contact.service';
import { ProductStatusTypeService } from '~global-services/product-status-type/product-status-type.service';
import { ProjectService } from '~global-services/project/project.service';
import { SupplierTypeService } from '~global-services/supplier-type/supplier-type.service';
import { TagService } from '~global-services/tag/tag.service';
import {
	ImageUploadRequestService
} from '~global-services/image-upload-request/image-upload-request.service';
import { FileUploadRequestService } from '~global-services/file-upload-request/file-upload-request.service';
import { ERMService } from '~global-services/_global/erm.service';
import { UserService } from '~global-services/user/user.service';
import { ShowService } from '~global-services/show/show.service';
import { BoothService } from '~global-services/booth/booth.service';
import { EventDescriptionService } from '~global-services/event-description/event-description.service';



@NgModule({
	imports: [
		CommonModule
	],
	declarations: [],
	providers: [
	]
})
export class GlobalServicesModule { }
