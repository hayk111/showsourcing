import { Injectable } from '@angular/core';
import {
	SampleStatusService,
	AttachmentService,
	AttachmentUploadRequestService,
	CategoryService,
	ContactService,
	EventService,
	ImageUploadRequestService,
	InvitationService,
	ProductService,
	ProductStatusService,
	ProjectService,
	SampleService,
	SupplierService,
	SupplierStatusService,
	SupplierTypeService,
	TagService,
	TaskService,
	TeamService,
	TeamUserService,
	UserService,
	CommentService,
	CountryService,
	CurrencyService
} from '~entity-services';
import { EntityMetadata, ERM } from '~models';
import { ExportRequestService } from '../export-request/export-request.service';
import { HarbourService } from '../harbour/harbour.service';
import { ImageService } from '../image/image.service';
import { IncoTermService } from '../inco-term/inco-term.service';
import { GlobalService } from './global.service';
import { ExtendedFieldService } from '../extended-field/extended-field.service';
import { ExtendedFieldDefinitionService } from '../extended-field-definition/extended-field-definition.service';

@Injectable(
	{ providedIn: 'root' }
)
export class ERMService {

	constructor(
		private attachmentService: AttachmentService,
		private attachmentUploadRequestSrv: AttachmentUploadRequestService,
		private categoryService: CategoryService,
		private commentSrv: CommentService,
		private contactService: ContactService,
		private countryService: CountryService,
		private currencyService: CurrencyService,
		private eventService: EventService,
		private exportRequestService: ExportRequestService,
		private extendedFieldSrv: ExtendedFieldService,
		private extendedFieldDefinitionSrv: ExtendedFieldDefinitionService,
		private harbourService: HarbourService,
		private imageService: ImageService,
		private imageUploadRequestService: ImageUploadRequestService,
		private incotermService: IncoTermService,
		private invitationSrv: InvitationService,
		private productService: ProductService,
		private productStatusSrv: ProductStatusService,
		private projectService: ProjectService,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private supplierService: SupplierService,
		private supplierStatusSrv: SupplierStatusService,
		private supplierTypeSrv: SupplierTypeService,
		private tagService: TagService,
		private taskSrv: TaskService,
		private teamService: TeamService,
		private teamUserSrv: TeamUserService,
		private userSrv: UserService
	) { }


	getGlobalServiceForEntity({ __typename: typename }: { __typename?: string })
		: GlobalService<any> {
		switch (typename) {
			case 'Attachment':
				return this.attachmentService;
			case 'AttachmentUploadRequest':
				return this.attachmentUploadRequestSrv;
			case 'Category':
				return this.categoryService;
			case 'Comment':
				return this.commentSrv;
			case 'Contact':
				return this.contactService;
			case 'Country':
				return this.countryService;
			case 'Currency':
				return this.currencyService;
			case 'Event':
				return this.eventService;
			case 'ExportRequest':
				return this.exportRequestService;
			case 'ExtendedField':
				return this.extendedFieldSrv;
			case 'ExtendedFieldDefinition':
				return this.extendedFieldDefinitionSrv;
			case 'Harbour':
				return this.harbourService;
			case 'Image':
				return this.imageService;
			case 'ImageUploadRequest':
				return this.imageUploadRequestService;
			case 'Incoterm':
				return this.incotermService;
			case 'Product':
				return this.productService;
			case 'ProductStatus':
				return this.productStatusSrv;
			case 'Project':
				return this.projectService;
			case 'Sample':
				return this.sampleSrv;
			case 'SampleStatus':
				return this.sampleStatusSrv;
			case 'Supplier':
				return this.supplierService;
			case 'SupplierStatus':
				return this.supplierStatusSrv;
			case 'Tag':
				return this.tagService;
			case 'Team':
				return this.teamService;
			case 'TeamUser':
				return this.teamUserSrv;
			case 'User':
				return this.userSrv;
			default:
				throw Error(`__typename ${typename} wasn't found`);
		}
	}

	getGlobalService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.ATTACHMENT:
				return this.attachmentService;
			case ERM.ATTACHMENT_UPLOAD_REQUEST:
				return this.attachmentUploadRequestSrv;
			case ERM.CATEGORY:
				return this.categoryService;
			case ERM.COMMENT:
				return this.commentSrv;
			case ERM.CONTACT:
				return this.contactService;
			case ERM.COUNTRY:
				return this.countryService;
			case ERM.CURRENCY:
				return this.currencyService;
			case ERM.EVENT:
				return this.eventService;
			case ERM.EXPORT_REQUEST:
				return this.exportRequestService;
			case ERM.EXTENDED_FIELD:
				return this.extendedFieldSrv;
			case ERM.EXTENDED_FIELD_DEFINITION:
				return this.extendedFieldDefinitionSrv;
			case ERM.HARBOUR:
				return this.harbourService;
			case ERM.IMAGE:
				return this.imageService;
			case ERM.IMAGE_UPLOAD_REQUEST:
				return this.imageUploadRequestService;
			case ERM.INCOTERM:
				return this.incotermService;
			case ERM.INVITATION:
				return this.invitationSrv;
			case ERM.PRODUCT:
				return this.productService;
			case ERM.PRODUCT_STATUS:
				return this.productStatusSrv;
			case ERM.PROJECT:
				return this.projectService;
			case ERM.SAMPLE:
				return this.sampleSrv;
			case ERM.SAMPLE_STATUS:
				return this.sampleStatusSrv;
			case ERM.SUPPLIER:
				return this.supplierService;
			case ERM.SUPPLIER_STATUS:
				return this.supplierStatusSrv;
			case ERM.SUPPLIER_TYPE:
				return this.supplierTypeSrv;
			case ERM.TAG:
				return this.tagService;
			case ERM.TASK:
				return this.taskSrv;
			case ERM.TEAM:
				return this.teamService;
			case ERM.TEAM_USER:
				return this.teamUserSrv;
			case ERM.USER:
				return this.userSrv;
			default:
				throw Error(`The ERM "${erm.singular}" has not an associated service`);
		}
	}

	getStatusService(erm: EntityMetadata): GlobalService<any> {
		switch (erm) {
			case ERM.SAMPLE_STATUS:
				return this.sampleStatusSrv;
			case ERM.SUPPLIER_STATUS:
				return this.supplierStatusSrv;
			case ERM.PRODUCT_STATUS:
				return this.productStatusSrv;
			default:
				throw Error(`The ERM "${erm.singular}" has not an associated status service`);
		}
	}
}
