import { InjectionToken } from '@angular/core';
import { Category } from '~models/category.model';
import { Contact } from '~models/contact.model';
import { Country } from '~models/country.model';
import { EventDescription } from '~models/event-description.model';
import { Event } from '~models/event.model';
import { Harbour } from '~models/harbour.model';
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


export class EntityMetadata {
	readonly constClass: new (...args: any[]) => any;
	readonly singular: string;
	readonly plural: string;
	readonly url: string;
	readonly destUrl: string;
	readonly image: string;

	constructor(
		singular: string,
		plural: string,
		constClass?: new (...args: any[]) => any,
		url?: string,
		destUrl?: string
	) {

		this.singular = singular;
		this.plural = plural;
		this.url = url || singular;
		this.destUrl = destUrl || this.url + '/details';
		this.constClass = constClass;
	}

}

// Must be added alphabetically
export class ERM {
	static readonly CATEGORY = new EntityMetadata('category', 'categories', Category);
	static readonly COMMENT = new EntityMetadata('comment', 'comments');
	static readonly CONTACT = new EntityMetadata('contact', 'contacts', Contact);
	static readonly COUNTRY = new EntityMetadata('country', 'countries', Country);
	static readonly CURRENCY = new EntityMetadata('currency', 'currencies');
	static readonly EVENT = new EntityMetadata('event', 'events', Event);
	static readonly EVENT_DESCRIPTION = new EntityMetadata('event description', 'event descriptions', EventDescription);
	static readonly FILE = new EntityMetadata('file', 'files');
	static readonly HARBOUR = new EntityMetadata('harbour', 'harbours', Harbour);
	static readonly IMAGE = new EntityMetadata('image', 'images', Image);
	static readonly INCOTERM = new EntityMetadata('incoterm', 'incoterms', IncoTerm);
	static readonly INVITATION = new EntityMetadata('invitation', 'invitations', Invitation);
	static readonly LOCATION = new EntityMetadata('location', 'locations');
	static readonly MEMBER = new EntityMetadata('member', 'members');
	static readonly PRODUCT = new EntityMetadata('product', 'products', Product);
	static readonly PRODUCT_STATUS = new EntityMetadata('product status', 'product status', ProductStatus, 'product-status');
	static readonly PRODUCT_VOTE = new EntityMetadata('product vote', 'product votes', Product, 'product-vote');
	static readonly PROFILE = new EntityMetadata('profile', 'profiles');
	static readonly PROJECT = new EntityMetadata('project', 'projects', Project);
	static readonly QUOTE = new EntityMetadata('quote', 'quotes', Quote);
	static readonly REVIEW = new EntityMetadata('review', 'reviews', Product);
	static readonly SAMPLE = new EntityMetadata('sample', 'samples', Sample);
	static readonly SAMPLE_STATUS = new EntityMetadata('sample status', 'samples status', Sample, 'sample-status');
	static readonly SHOW = new EntityMetadata('show', 'shows', Show);
	static readonly SUPPLIER = new EntityMetadata('supplier', 'suppliers', Supplier);
	static readonly SUPPLIER_STATUS = new EntityMetadata('supplier status', 'supplier status', SupplierStatus, 'supplier-status');
	static readonly SUPPLIER_TAG = new EntityMetadata('supplier tag', 'supplier tags', Tag, 'supplier-tag');
	static readonly SUPPLIER_TYPE = new EntityMetadata('supplier type', 'supplier types', Supplier, 'supplier-type');
	static readonly TAG = new EntityMetadata('tag', 'tags', Tag);
	static readonly TASK = new EntityMetadata('task', 'tasks', Task);
	static readonly TEAM = new EntityMetadata('team', 'teams', Team);
	static readonly TEAM_USER = new EntityMetadata('team user', 'team users');
	static readonly USER = new EntityMetadata('user', 'users', User);

	constructor() { }

	/** if the string matches with any of the attributeson ERM this function will return that property */
	static getEntityMetadata(name: string): EntityMetadata {
		for (const item in ERM) {
			if (name === ERM[item].singular || name === ERM[item].plural)
				return ERM[item];
		}
		throw Error(`The string "${name}" does not exist on the _erm.enum.ts`);
	}
}

export const ERM_TOKEN = new InjectionToken<string>('ERM_TOKEN');
