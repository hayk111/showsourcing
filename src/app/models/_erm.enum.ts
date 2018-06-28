
export class ReadProperty {
	readonly singular: string;
	readonly plural: string;
	readonly url: string;

	constructor(singular: string, plural: string, url?: string) {
		this.singular = singular;
		this.plural = plural;
		this.url = url || singular;
	}

}

// Must be added alphabetically
export class ERM {
	static readonly CATEGORY = new ReadProperty('category', 'categories');
	static readonly COMMENT = new ReadProperty('comment', 'comments');
	static readonly CONTACT = new ReadProperty('contact', 'contacts');
	static readonly CURRENCY = new ReadProperty('currency', 'currencies');
	static readonly DETAIL = new ReadProperty('detail', 'details');
	static readonly EVENT = new ReadProperty('event', 'events');
	static readonly FIELD = new ReadProperty('field', 'fields');
	static readonly FILE = new ReadProperty('file', 'files');
	static readonly IMAGE = new ReadProperty('image', 'images');
	static readonly ITEM = new ReadProperty('item', 'items');
	static readonly MEMBER = new ReadProperty('member', 'members');
	static readonly PRODUCT = new ReadProperty('product', 'products');
	static readonly PRODUCT_STATUS = new ReadProperty('product status', 'product status', 'product-status');
	static readonly PRODUCT_TAG = new ReadProperty('product tag', 'product tags', 'product-tag');
	static readonly PRODUCT_VOTE = new ReadProperty('product vote', 'product votes', 'product-vote');
	static readonly PROFILE = new ReadProperty('profile', 'profiles');
	static readonly PROJECT = new ReadProperty('project', 'projects');
	static readonly SUPPLIER = new ReadProperty('supplier', 'suppliers');
	static readonly SUPPLIER_STATUS = new ReadProperty('supplier status', 'supplier status', 'supplier-status');
	static readonly SUPPLIER_TYPE = new ReadProperty('supplier type', 'supplier types', 'supplier-type');
	static readonly SUPPLIER_TAG = new ReadProperty('supplier tag', 'supplier tags', 'supplier-tag');
	static readonly TAG = new ReadProperty('tag', 'tags');
	static readonly TASK = new ReadProperty('task', 'tasks');
	static readonly TEAM = new ReadProperty('team', 'teams');
	static readonly USER = new ReadProperty('user', 'users');

	constructor() { }

	/** if the string matches with any of the attributeson ERM this fucniton will return that property */
	public getReadProperty(name: string): ReadProperty {
		for (const item in ERM) {
			if (name.match(ERM[item].singular) || name.match(ERM[item].plural))
				return ERM[item];
		}
		throw Error('The string passed does not exist on the _erm.enum.ts');
	}
}

