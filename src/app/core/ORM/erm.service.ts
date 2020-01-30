import { Injectable } from '@angular/core';
import {
	AttachmentService,
	AttachmentUploadRequestService,
	CategoryService,
	CommentService,
	ContactService,
	CountryService,
	CurrencyService,
	EventService,
	ImageUploadRequestService,
	InvitationService,
	LengthUnitService,
	ProductService,
	ProductStatusService,
	ProjectService,
	SampleService,
	SampleStatusService,
	SupplierService,
	SupplierStatusService,
	SupplierTypeService,
	TagService,
	TaskService,
	TeamService,
	TeamUserService,
	UserService,
	WeightUnitService,
	RpcService
} from '~entity-services';
import { EntityMetadata, ERM } from '~models';

import { CreateRequestService } from './services/create-request/create-request.service';
import { ExportRequestService } from './services/export-request/export-request.service';
import { ExtendedFieldDefinitionService } from './services/extended-field-definition/extended-field-definition.service';
import { ExtendedFieldService } from './services/extended-field/extended-field.service';
import { HarbourService } from './services/harbour/harbour.service';
import { ImageService } from './services/image/image.service';
import { IncoTermService } from './services/inco-term/inco-term.service';
import { RequestElementService } from './services/request-element/request-element.service';
import { RequestReplyService } from './services/request-reply/request-reply.service';
import { RequestTemplateService } from './services/request-template/request-template.service';
import { SupplierRequestService } from './services/supplier-request/supplier-request.service';
import { GlobalService } from './services/_global/global.service';
import { SelectorElementService } from './services/selector-element/selector-element.service';
import { TemplateFieldService } from './services/template-field/template-field.service';
import { CompanyService } from './services/company/company.service';

@Injectable(
	{ providedIn: 'root' }
)
export class ERMService {

	constructor(
		private attachmentService: AttachmentService,
		private attachmentUploadRequestSrv: AttachmentUploadRequestService,
		private categoryService: CategoryService,
		private commentSrv: CommentService,
		private companySrv: CompanyService,
		private contactService: ContactService,
		private countryService: CountryService,
		private createRequestService: CreateRequestService,
		private currencyService: CurrencyService,
		private eventService: EventService,
		private exportRequestService: ExportRequestService,
		private extendedFieldDefinitionSrv: ExtendedFieldDefinitionService,
		private extendedFieldSrv: ExtendedFieldService,
		private harbourService: HarbourService,
		private imageService: ImageService,
		private imageUploadRequestService: ImageUploadRequestService,
		private incotermService: IncoTermService,
		private invitationSrv: InvitationService,
		private lenghtUnitSrv: LengthUnitService,
		private productService: ProductService,
		private productStatusSrv: ProductStatusService,
		private projectService: ProjectService,
		private requestElementService: RequestElementService,
		private requestReplyService: RequestReplyService,
		private requestTemplateService: RequestTemplateService,
		private rpcService: RpcService,
		private sampleSrv: SampleService,
		private sampleStatusSrv: SampleStatusService,
		private selectorElementSrv: SelectorElementService,
		private supplierRequestSrv: SupplierRequestService,
		private supplierService: SupplierService,
		private supplierStatusSrv: SupplierStatusService,
		private supplierTypeSrv: SupplierTypeService,
		private tagService: TagService,
		private taskSrv: TaskService,
		private teamService: TeamService,
		private teamUserSrv: TeamUserService,
		private templateFieldSrv: TemplateFieldService,
		private userSrv: UserService,
		private weightUnitSrv: WeightUnitService,
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
			case 'Company':
				return this.companySrv;
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
			case 'IncoTerm':
				return this.incotermService;
			case 'LengthUnit':
				return this.lenghtUnitSrv;
			case 'Product':
				return this.productService;
			case 'ProductStatus':
				return this.productStatusSrv;
			case 'Project':
				return this.projectService;
			case 'CreateRequest':
				return this.createRequestService;
			case 'RequestElement':
				return this.requestElementService;
			case 'RequestReply':
				return this.requestReplyService;
			case 'RequestTemplate':
				return this.requestTemplateService;
			case 'Rpc':
				return this.rpcService;
			case 'Sample':
				return this.sampleSrv;
			case 'SampleStatus':
				return this.sampleStatusSrv;
			case 'SelectorElement':
				return this.selectorElementSrv;
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
			case 'TemplateField':
				return this.templateFieldSrv;
			case 'User':
				return this.userSrv;
			case 'WeightUnit':
				return this.weightUnitSrv;
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
			case ERM.COMPANY:
				return this.companySrv;
			case ERM.EMAIL:
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
			case ERM.INCO_TERM:
				return this.incotermService;
			case ERM.INVITATION:
				return this.invitationSrv;
			case ERM.LENGTH_UNIT:
				return this.lenghtUnitSrv;
			case ERM.PRODUCT:
				return this.productService;
			case ERM.PRODUCT_STATUS:
				return this.productStatusSrv;
			case ERM.PROJECT:
				return this.projectService;
			case ERM.REQUEST_ELEMENT:
				return this.requestElementService;
			case ERM.REQUEST_REPLY:
				return this.requestReplyService;
			case ERM.REQUEST_RPC:
				return this.rpcService;
			case ERM.REQUEST_TEMPLATE:
				return this.requestTemplateService;
			case ERM.CREATE_REQUEST:
				return this.createRequestService;
			case ERM.SAMPLE:
				return this.sampleSrv;
			case ERM.SAMPLE_STATUS:
				return this.sampleStatusSrv;
			case ERM.SELECTOR_ELEMENT:
				return this.selectorElementSrv;
			case ERM.SUPPLIER:
				return this.supplierService;
			case ERM.SUPPLIER_REQUEST:
				return this.supplierRequestSrv;
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
			case ERM.TEMPLATE_FIELD:
				return this.templateFieldSrv;
			case ERM.USER:
				return this.userSrv;
			case ERM.WEIGHT_UNIT:
				return this.weightUnitSrv;
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
