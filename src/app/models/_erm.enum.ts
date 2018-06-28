
export class EntityMetadata {
	readonly singular: string;
	readonly plural: string;
	readonly url: string;
	readonly createDestUrl: string;

	constructor(
		singular: string,
		plural: string,
		url?: string,
		createDestUrl?: string) {

		this.singular = singular;
		this.plural = plural;
		this.url = url || singular;
		this.createDestUrl = createDestUrl || '';
	}

}

// Must be added alphabetically
export class ERM {
	// Discuss if we should implement it like this the destination url
	static readonly CATEGORY = new EntityMetadata('category', 'categories');
	static readonly COMMENT = new EntityMetadata('comment', 'comments');
	static readonly CONTACT = new EntityMetadata('contact', 'contacts');
	static readonly CURRENCY = new EntityMetadata('currency', 'currencies');
	static readonly DETAIL = new EntityMetadata('detail', 'details');
	static readonly EVENT = new EntityMetadata('event', 'events');
	static readonly FIELD = new EntityMetadata('field', 'fields');
	static readonly FILE = new EntityMetadata('file', 'files');
	static readonly IMAGE = new EntityMetadata('image', 'images');
	static readonly ITEM = new EntityMetadata('item', 'items');
	static readonly MEMBER = new EntityMetadata('member', 'members', undefined, '/product/details');
	static readonly PRODUCT = new EntityMetadata('product', 'products');
	static readonly PRODUCT_STATUS = new EntityMetadata('product status', 'product status', 'product-status');
	static readonly PRODUCT_TAG = new EntityMetadata('product tag', 'product tags', 'product-tag');
	static readonly PRODUCT_VOTE = new EntityMetadata('product vote', 'product votes', 'product-vote');
	static readonly PROFILE = new EntityMetadata('profile', 'profiles');
	static readonly PROJECT = new EntityMetadata('project', 'projects', undefined, '/project/details');
	static readonly SUPPLIER = new EntityMetadata('supplier', 'suppliers', undefined, '/supplier/details');
	static readonly SUPPLIER_STATUS = new EntityMetadata('supplier status', 'supplier status', 'supplier-status');
	static readonly SUPPLIER_TYPE = new EntityMetadata('supplier type', 'supplier types', 'supplier-type');
	static readonly SUPPLIER_TAG = new EntityMetadata('supplier tag', 'supplier tags', 'supplier-tag');
	static readonly TAG = new EntityMetadata('tag', 'tags');
	static readonly TASK = new EntityMetadata('task', 'tasks');
	static readonly TEAM = new EntityMetadata('team', 'teams');
	static readonly USER = new EntityMetadata('user', 'users');

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

