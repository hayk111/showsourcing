import { GlobalQueries } from '~entity-services/_global/global-queries.class';

export abstract class SupplierQueries extends GlobalQueries {

	static readonly supplierType = `supplierType { id, name }`;
	static readonly logoImage = `logoImage { id, fileName, urls { url } }`;
	static readonly user = (name) => `${name} { id, lastName, firstName, avatar { id, fileName, urls { id, url } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly categories = `categories { id, name }`;
	static readonly tags = ` tags { id, name }`;
	static readonly images = `images { id, urls { url }, orientation }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	// TODO BackEnd add archived
	// tslint:disable-next-line:max-line-length
	// static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"supplier" query:"deleted == false AND archived == false") { ... on ProductCollection { count }}`;
	// tslint:disable-next-line:max-line-length
	static readonly productsLinked = `productsLinked: _linkingObjects(objectType: "Product" property:"supplier" query:"deleted == false") { ... on ProductCollection { count }}`;
	// tslint:disable-next-line:max-line-length
	static readonly tasksLinked = `tasksLinked: _linkingObjects(objectType: "Task" property:"supplier" query:"deleted == false") { ... on TaskCollection { count, items { dueDate } }}`;
	// tslint:disable-next-line:max-line-length
	static readonly samplesLinked = `samplesLinked: _linkingObjects(objectType: "Sample" property:"supplier" query:"deleted == false") { ... on SampleCollection { count }}`;
	// tslint:disable-next-line: max-line-length
	static readonly tasksLinkedAssignedToMe = (userId: string) => `tasksLinkedAssignedToMe: _linkingObjects(objectType: "Task" property:"supplier" query:"deleted == false AND assignee.id == '${userId}' AND done == false") {
		... on TaskCollection {
			count
			}
		}`

	// tslint:disable-next-line: max-line-length
	static readonly samplesLinkedAssignedToMe = (userId: string) => `samplesLinkedAssignedToMe: _linkingObjects(objectType: "Sample" property:"supplier" query:"deleted == false AND assignee.id == '${userId}'") {
		... on SampleCollection {
			count
		}
	}`

	// tslint:disable-next-line:max-line-length
	static readonly contactsLinked = `contactsLinked: _linkingObjects(objectType: "Contact" property:"supplier" query:"deleted == false") { ... on ContactCollection { count }}`;

	static readonly comments = `comments {
		id, text, creationDate, lastUpdatedDate, deleted,
		${SupplierQueries.user('createdBy')},
		${SupplierQueries.user('lastUpdatedBy')}
	}`;
	static readonly definition = (name: string) => `${name} { id, label, type, order, metadata }`;
	static readonly extendedFields = `extendedFields {
		id, value,
		selectorValues { id, value, ${SupplierQueries.definition('fieldDefinition')} },
		${SupplierQueries.definition('definition')}
	}`;

	// to be built at runtime via the buildQuery function
	static one = '';

	// to be built at runtime via the buildQuery function
	static many = '';

	static readonly all = `
		name,
		description,
		country,
		favorite,
		reference,
		deleted,
		creationDate,
		lastUpdatedDate,
		archived,
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.supplierType}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.user('assignee')}
		${SupplierQueries.user('createdBy')}
		${SupplierQueries.user('lastUpdatedBy')}
		${SupplierQueries.productsLinked}
		${SupplierQueries.tasksLinked}
		${SupplierQueries.samplesLinked}
		${SupplierQueries.contactsLinked}
	`;

	static readonly update = `
		id,
		favorite,
		${SupplierQueries.comments}
	`;

	static buildQueries(userId: string) {
		SupplierQueries.one = `
		name,
		description,
		website,
		phoneNumber,
		country,
		city,
		address,
		officeEmail,
		officePhone,
		incoTerm,
		harbour,
		favorite,
		generalMOQ,
		generalLeadTime,
		creationDate,
		lastUpdatedDate,
		reference,
		archived,
		${SupplierQueries.extendedFields}
		${SupplierQueries.comments}
		${SupplierQueries.supplierType}
		${SupplierQueries.logoImage}
		${SupplierQueries.user('assignee')}
		${SupplierQueries.user('createdBy')}
		${SupplierQueries.user('lastUpdatedBy')}
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.images}
		${SupplierQueries.attachments}
		${SupplierQueries.tags}
		${SupplierQueries.productsLinked}
		${SupplierQueries.contactsLinked}
		${SupplierQueries.tasksLinked}
		${SupplierQueries.samplesLinked}
		${SupplierQueries.tasksLinkedAssignedToMe(userId)}
		${SupplierQueries.samplesLinkedAssignedToMe(userId)}
		`;
		SupplierQueries.many = `
		name,
		description,
		country,
		favorite,
		deleted,
		creationDate,
		lastUpdatedDate,
		reference,
		archived,
		${SupplierQueries.extendedFields}
		${SupplierQueries.status}
		${SupplierQueries.categories}
		${SupplierQueries.comments}
		${SupplierQueries.images}
		${SupplierQueries.tags}
		${SupplierQueries.user('assignee')}
		${SupplierQueries.user('createdBy')}
		${SupplierQueries.user('lastUpdatedBy')}
		${SupplierQueries.productsLinked}
		${SupplierQueries.tasksLinked}
		${SupplierQueries.samplesLinked}
		${SupplierQueries.contactsLinked}
		${SupplierQueries.logoImage}
		${SupplierQueries.supplierType}
		${SupplierQueries.samplesLinkedAssignedToMe(userId)}
		${SupplierQueries.tasksLinkedAssignedToMe(userId)}
		`;
	}

}

