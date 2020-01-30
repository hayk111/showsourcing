import { InjectionToken } from '@angular/core';
import { Attachment } from '~models/attachment.model';
import { Category } from '~models/category.model';
import { Contact } from '~models/contact.model';
import { Country } from '~models/country.model';
import { EventDescription } from '~models/event-description.model';
import { Event } from '~models/event.model';
import { ExportRequest } from '~models/export-request.model';
import { Harbour } from '~models/harbour.model';
import { ImageUploadRequest } from '~models/image-upload-request.model';
import { IncoTerm } from '~models/inco-term.model';
import { Invitation } from '~models/invitation.model';
import { ProductStatus } from '~models/product-status.model';
import { Product } from '~models/product.model';
import { Project } from '~models/project.model';
import { Quote } from '~models/quote.model';
import { Sample } from '~models/sample.model';
import { Show } from '~models/show.model';
import { SupplierStatus } from '~models/supplier-status.model';
import { Supplier } from '~models/supplier.model';
import { Tag } from '~models/tag.model';
import { Task } from '~models/task.model';
import { Team } from '~models/team.model';
import { User } from '~models/user.model';

import { CreateRequest } from './models/create-request.model';
import { ExtendedFieldDefinition } from './models/extended-field-definition.model';
import { ExtendedField } from './models/extended-field.model';
import { Price } from './models/price.model';
import { RequestElement } from './models/request-element.model';
import { RequestReply } from './models/request-reply.model';
import { RequestTemplate } from './models/request-template.model';
import { SelectorElement } from './models/selector-element.model';
import { SupplierRequest } from './models/supplier-request.model';
import { Company } from './models/company.model';
import { RPCRequest } from './models/rpc-request.model';
import { EntityName } from './entity.utils';

// TODO we need to clean this part of the application

export const ERM_TOKEN = new InjectionToken<string>('ERM_TOKEN');

export class EntityMetadata {
	readonly constClass: new (...args: any[]) => any;
	readonly singular: string;
	readonly plural: string;
	readonly url: string;
	readonly destUrl: string;
	readonly image: string;
	readonly translationKey: string;
	readonly entityName: EntityName;

	constructor(
		singular: string,
		plural: string,
		translationKey: string,
		constClass?: new (...args: any[]) => any,
		url?: string,
		destUrl?: string
	) {

		this.singular = singular;
		this.plural = plural;
		this.translationKey = translationKey;
		this.url = url || plural;
		this.destUrl = destUrl || this.url;
		this.constClass = constClass;
		this.entityName = this.singular as EntityName;
	}

}

// Must be added ALPHABETICALLY
// Laziness is your best friend.  Never do twice what you can automate once
// - Ghandi
export class ERM {

	static readonly ATTACHMENT = new EntityMetadata('attachment', 'attachments', 'ATTACHMENT', Attachment);
	static readonly ATTACHMENT_UPLOAD_REQUEST = new EntityMetadata(
		'attachment upload request', 'attachment upload requests', 'ATTACHMENT_UPLOAD_REQUEST', Attachment);
	static readonly CATEGORY = new EntityMetadata('category', 'categories', 'CATEGORY', Category);
	static readonly COMMENT = new EntityMetadata('comment', 'comments', 'COMMENT');
	static readonly COMPANY = new EntityMetadata('company', 'companies', 'COMPANY', Company);
	static readonly CONTACT = new EntityMetadata('contact', 'contacts', 'CONTACT', Contact);
	static readonly COUNTRY = new EntityMetadata('country', 'countries', 'COUNTRY', Country);
	static readonly CREATE_REQUEST = new EntityMetadata('createRequest', 'createRequests', 'CREATE_REQUEST', CreateRequest);
	static readonly CURRENCY = new EntityMetadata('currency', 'currencies', 'CURRENCY');
	static readonly EMAIL = new EntityMetadata('email', 'emails', 'EMAIL', Contact);
	static readonly EVENT = new EntityMetadata('event', 'events', 'EVENT', Event);
	static readonly EVENT_DESCRIPTION = new EntityMetadata('event description', 'event descriptions', 'EVENT_DESCRIPTION', EventDescription);
	static readonly EXPORT_REQUEST = new EntityMetadata('export request', 'export requests', 'EXPORT_REQUEST', ExportRequest);
	static readonly EXTENDED_FIELD = new EntityMetadata('extended field', 'extended fields', 'EXTENDED_FIELD', ExtendedField);
	static readonly EXTENDED_FIELD_DEFINITION = new EntityMetadata(
		'extended field definition', 'extended field definitions', 'EXTENDED_FIELD_DEFINITION', ExtendedFieldDefinition);
	static readonly FILE = new EntityMetadata('file', 'files', 'FILE');
	static readonly HARBOUR = new EntityMetadata('harbour', 'harbours', 'HARBOUR', Harbour);
	static readonly IMAGE = new EntityMetadata('image', 'images', 'IMAGE', Image);
	static readonly IMAGE_UPLOAD_REQUEST = new EntityMetadata(
		'image upload request', 'image upload requests', 'IMAGE_UPLOAD_REQUEST', ImageUploadRequest);
	static readonly INCO_TERM = new EntityMetadata('inco term', 'inco terms', 'INCO_TERM', IncoTerm);
	static readonly INVITATION = new EntityMetadata('invitation', 'invitations', 'INVITATION', Invitation);
	static readonly LENGTH_UNIT = new EntityMetadata('length unit', 'length units', 'LENGTH_UNIT');
	static readonly LOCATION = new EntityMetadata('location', 'locations', 'LOCATION');
	static readonly MEMBER = new EntityMetadata('member', 'members', 'MEMBER');
	static readonly PICKER_FIELD = new EntityMetadata('picker field', 'picker fields', 'PICKER_FIELD');
	static readonly PRICE = new EntityMetadata('price', 'prices', 'PRICE', Price);
	static readonly PRODUCT = new EntityMetadata('product', 'products', 'PRODUCT', Product);
	static readonly PRODUCT_STATUS = new EntityMetadata('product status', 'product status', 'PRODUCT_STATUS', ProductStatus, 'product-status');
	static readonly PRODUCT_VOTE = new EntityMetadata('product vote', 'product votes', 'PRODUCT_VOTE', Product, 'product-vote');
	static readonly PROFILE = new EntityMetadata('profile', 'profiles', 'PROFILE');
	static readonly PROJECT = new EntityMetadata('project', 'projects', 'PROJECT', Project);
	static readonly QUOTE = new EntityMetadata('quote', 'quotes', 'QUOTE', Quote);
	static readonly REQUEST = new EntityMetadata('request', 'requests', 'REQUEST', Request);
	static readonly REQUEST_ELEMENT = new EntityMetadata('request element', 'request elements', 'REQUEST_ELEMENT', RequestElement);
	static readonly REQUEST_REPLY = new EntityMetadata('request reply', 'request replies', 'REQUEST_REPLY', RequestReply);
	static readonly REQUEST_RPC = new EntityMetadata('request', 'requests', 'REQUEST_RPC', RPCRequest);
	static readonly REQUEST_TEMPLATE = new EntityMetadata('request template', 'request templates', 'REQUEST_TEMPLATE', RequestTemplate);
	static readonly REVIEW = new EntityMetadata('review', 'reviews', 'REVIEW', Product);
	static readonly SAMPLE = new EntityMetadata('sample', 'samples', 'SAMPLE', Sample);
	static readonly SAMPLE_STATUS = new EntityMetadata('sample status', 'samples status', 'SAMPLE_STATUS', Sample, 'sample-status');
	static readonly SELECTOR_ELEMENT = new EntityMetadata(
		'selector element', 'selector elements', 'SELECTOR_ELEMENT', SelectorElement, 'selector-element');
	static readonly SHOW = new EntityMetadata('show', 'shows', 'SHOW', Show);
	static readonly SUPPLIER = new EntityMetadata('supplier', 'suppliers', 'SUPPLIER', Supplier);
	static readonly SUPPLIER_REQUEST = new EntityMetadata('request', 'requests', 'SUPPLIER_REQUEST', SupplierRequest);
	static readonly SUPPLIER_STATUS = new EntityMetadata(
		'supplier status', 'supplier status', 'SUPPLIER_STATUS', SupplierStatus, 'supplier-status');
	static readonly SUPPLIER_TAG = new EntityMetadata('supplier tag', 'supplier tags', 'SUPPLIER_TAG', Tag, 'supplier-tag');
	static readonly SUPPLIER_TYPE = new EntityMetadata('supplier type', 'supplier types', 'SUPPLIER_TYPE', Supplier, 'supplier-type');
	static readonly TAG = new EntityMetadata('tag', 'tags', 'TAG', Tag);
	static readonly TASK = new EntityMetadata('task', 'tasks', 'TASK', Task);
	static readonly TEAM = new EntityMetadata('team', 'teams', 'TEAM', Team);
	static readonly TEAM_USER = new EntityMetadata('team user', 'team users', 'TEAM_USER');
	static readonly TEMPLATE_FIELD = new EntityMetadata('template field', 'template fields', 'TEMPLATE_FIELD');
	static readonly USER = new EntityMetadata('user', 'users', 'USER', User);
	static readonly WEIGHT_UNIT = new EntityMetadata('weight unit', 'weight units', 'WEIGHT_UNIT');

	constructor() { }

	/** if the string matches with any of the attributeson ERM this function will return that property */
	static getEntityMetadata(name: string): EntityMetadata {
		for (const item in ERM) {
			if (name === ERM[item].singular || name === ERM[item].plural)
				return ERM[item];
		}
		throw Error(`The string "${name}" does not exist on the _erm.utils.ts`);
	}
}
