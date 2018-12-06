import { Category } from '~models/category.model';
import { Event } from '~models/event.model';
import { Product } from '~models/product.model';
import { Supplier } from '~models/supplier.model';
import { Show } from '~models/show.model';
import { Tag } from '~models/tag.model';
import { Project } from '~models/project.model';
import { User } from '~models/user.model';
import { Team } from '~models/team.model';
import { Task } from '~models/task.model';
import { Quote } from '~models/quote.model';
import { Contact } from '~models/contact.model';
import { Invitation } from '~models/invitation.model';
import { InjectionToken } from '@angular/core';
import { Sample } from './sample.model';
import { SupplierStatus } from './supplier-status.model';
import { ProductStatus } from './product-status.model';


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
	static readonly CURRENCY = new EntityMetadata('currency', 'currencies');
	static readonly EVENT = new EntityMetadata('event', 'events', Event);
	static readonly FILE = new EntityMetadata('file', 'files');
	static readonly IMAGE = new EntityMetadata('image', 'images', Image);
	static readonly INVITATION = new EntityMetadata('invitation', 'invitations', Invitation);
	static readonly MEMBER = new EntityMetadata('member', 'members');
	static readonly LOCATION = new EntityMetadata('location', 'locations');
	static readonly PRODUCT = new EntityMetadata('product', 'products', Product);
	static readonly PRODUCT_STATUS = new EntityMetadata('product status', 'product status', ProductStatus, 'product-status');
	static readonly PRODUCT_VOTE = new EntityMetadata('product vote', 'product votes', Product, 'product-vote');
	static readonly PROFILE = new EntityMetadata('profile', 'profiles');
	static readonly PROJECT = new EntityMetadata('project', 'projects', Project);
	static readonly QUOTE = new EntityMetadata('quote', 'quotes', Quote);
	static readonly REVIEW = new EntityMetadata('review', 'reviews', Product);
	static readonly SHOW = new EntityMetadata('show', 'shows', Show);
	static readonly SAMPLE = new EntityMetadata('sample', 'samples', Sample);
	static readonly SAMPLE_STATUS = new EntityMetadata('sample status', 'samples status', Sample, 'sample-status');
	static readonly SUPPLIER = new EntityMetadata('supplier', 'suppliers', Supplier);
	static readonly SUPPLIER_STATUS = new EntityMetadata(
		'supplier status',
		'supplier status',
		SupplierStatus,
		'supplier-status');
	static readonly SUPPLIER_TYPE = new EntityMetadata('supplier type', 'supplier types', Supplier, 'supplier-type');
	static readonly SUPPLIER_TAG = new EntityMetadata('supplier tag', 'supplier tags', Tag, 'supplier-tag');
	static readonly TAG = new EntityMetadata('tag', 'tags', Tag);
	static readonly TASK = new EntityMetadata('task', 'tasks', Task);
	static readonly TEAM = new EntityMetadata('team', 'teams', Team);
	static readonly TEAM_USER = new EntityMetadata('team user', 'team users');
	static readonly USER = new EntityMetadata('user', 'users', User);

	constructor() { }

	/** if the string matches with any of the attributeson ERM this function will return that property */
	static getEntityMetadata(name: string): EntityMetadata {
		for (const item in ERM) {
			if (name.match(ERM[item].singular) || name.match(ERM[item].plural))
				return ERM[item];
		}
		throw Error('The string passed does not exist on the _erm.enum.ts');
	}
}

export const ERM_TOKEN = new InjectionToken<string>('ERM_TOKEN');
