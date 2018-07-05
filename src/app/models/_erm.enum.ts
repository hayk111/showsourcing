import { Category } from '~models/category.model';
import { Event } from '~models/event.model';
import { Product } from '~models/product.model';
import { Supplier } from '~models/supplier.model';
import { Tag } from '~models/tag.model';
import { Project } from '~models/project.model';
import { User } from '~models/user.model';
import { Team } from '~models/team.model';
import { Task } from '~models/task.model';
import { Contact } from '~models/contact.model';


export class EntityMetadata {
	readonly constClass: new (...args: any[]) => any;
	readonly singular: string;
	readonly plural: string;
	readonly url: string;
	readonly destUrl: string;

	constructor(
		singular: string,
		plural: string,
		constClass?: new (...args: any[]) => any,
		url?: string,
		destUrl?: string) {

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
	static readonly DETAIL = new EntityMetadata('detail', 'details');
	static readonly EVENT = new EntityMetadata('event', 'events', Event);
	static readonly FIELD = new EntityMetadata('field', 'fields');
	static readonly FILE = new EntityMetadata('file', 'files');
	static readonly IMAGE = new EntityMetadata('image', 'images', Image);
	static readonly ITEM = new EntityMetadata('item', 'items');
	static readonly MEMBER = new EntityMetadata('member', 'members');
	static readonly PRODUCT = new EntityMetadata('product', 'products', Product);
	static readonly PRODUCT_STATUS = new EntityMetadata('product status', 'product status', Product, 'product-status');
	static readonly PRODUCT_VOTE = new EntityMetadata('product vote', 'product votes', Product, 'product-vote');
	static readonly PROFILE = new EntityMetadata('profile', 'profiles');
	static readonly PROJECT = new EntityMetadata('project', 'projects', Project);
	static readonly SUPPLIER = new EntityMetadata('supplier', 'suppliers', Supplier);
	static readonly SUPPLIER_STATUS = new EntityMetadata('supplier status', 'supplier status', Supplier, 'supplier-status');
	static readonly SUPPLIER_TYPE = new EntityMetadata('supplier type', 'supplier types', Supplier, 'supplier-type');
	static readonly SUPPLIER_TAG = new EntityMetadata('supplier tag', 'supplier tags', Tag, 'supplier-tag');
	static readonly TAG = new EntityMetadata('tag', 'tags', Tag);
	static readonly TASK = new EntityMetadata('task', 'tasks', Task);
	static readonly TEAM = new EntityMetadata('team', 'teams', Team);
	static readonly USER = new EntityMetadata('user', 'users', User);
	static readonly TEAM_USER = new EntityMetadata('team user', 'team users');

	constructor() { }

	/** if the string matches with any of the attributeson ERM this fucniton will return that property */
	public getEntityMetadata(name: string): EntityMetadata {
		for (const item in ERM) {
			if (name.match(ERM[item].singular) || name.match(ERM[item].plural))
				return ERM[item];
		}
		throw Error('The string passed does not exist on the _erm.enum.ts');
	}
}

