import { GlobalQueries } from '~core/ORM/services/_global/global-queries.class';

export abstract class ProductQueries extends GlobalQueries {

	// tslint:disable-next-line: max-line-length
	static readonly tasksLinked = `tasksLinked: _linkingObjects(objectType: "Task" property:"product" query:"deleted == false AND archived == false") {
		... on TaskCollection {
			count, items {
				id, name, reference, dueDate, done
			}
		 }
		}`;

	// tslint:disable-next-line: max-line-length
	static readonly samplesLinked = `samplesLinked: _linkingObjects(objectType: "Sample" property:"product" query:"deleted == false AND archived == false") {
		... on SampleCollection {
			count, items {
				id, name, reference,
				status { id, name, category, inWorkflow, step },
				assignee { id, firstName, lastName, avatar { id, urls { id, url } } }
			}
		}
	}`;

	// tslint:disable-next-line: max-line-length
	static readonly tasksLinkedAssignedToMe = (userId: string) => `tasksLinkedAssignedToMe: _linkingObjects(objectType: "Task" property:"product" query:"deleted == false AND assignee.id == '${userId}' AND done == false AND archived == false") {
		... on TaskCollection {
			count
		 }
		}`

	// tslint:disable-next-line: max-line-length
	static readonly samplesLinkedAssignedToMe = (userId: string) => `samplesLinkedAssignedToMe: _linkingObjects(objectType: "Sample" property:"product" query:"deleted == false AND assignee.id == '${userId}' AND archived == false") {
		... on SampleCollection {
			count
		}
	}`

	// tslint:disable-next-line: max-line-length
	static readonly tasksLinkedUndone = `tasksLinkedUndone: _linkingObjects(objectType: "Task" property:"product" query:"deleted == false AND done == false AND archived == false") {
		... on TaskCollection {
			count, items {
				id, name, reference, dueDate, done
			}
		 }
		}`;

	// in a product there are many sub entities, those are utilities
	// so when we query a product we can do things like selectOne(id, ProductQueries.images)
	// to only get a response like this
	// product { id, images { id, filename }}
	// the ID of the product will be requested always.

	// the goal is to use those utilities a bit everywhere even if they don't match exactly the data we need
	// it makes the code easier to read. It means tho, that those sub queries must be quite exhaustive.
	static readonly images = `images { id, orientation, imageType, urls { id, url } }`;
	static readonly attachments = `attachments { id, fileName, url, size }`;
	static readonly supplier = `supplier {
		reference
		id, name, address, country, favorite, officeEmail,
		logoImage { id, urls { url } }
		categories { id, name }
		images { id, urls { url }, imageType }
		votes { id, value }
	}`;
	static readonly price = (name = 'price') => `${name} { id, currency, value } `;
	static readonly category = `category { id, name }`;
	static readonly projects = `projects { id, name, description }`;
	static readonly event = `event { id, name, description { id name description logoImage { id, urls { id, url } } } }`;
	static readonly status = `status { id, name, category, step, inWorkflow }`;
	static readonly tags = `tags { id, name }`;
	// uncomment and replace when the Image.creationDate bug is fixed on votes, avatar { id, fileName, imageType, creationDate }
	static readonly votes = `votes { id, value, user { id, firstName, lastName } }`;
	static readonly user = (name: string) => `${name} { id, firstName, lastName, avatar { id, urls { id, url } } }`;
	static readonly comments = `comments {
		id, text, creationDate, lastUpdatedDate, deleted,
		${ProductQueries.user('createdBy')},
		${ProductQueries.user('lastUpdatedBy')}
	}`;
	static readonly priceMatrix = `priceMatrix { id, rows { id, label, price { id, value, currency } } }`;
	static readonly packaging = (name: string) => `${name} { id, height, width, length, unit, itemsQuantity, weight, weightUnit, }`;
	static readonly definition = (name: string) => `${name} { id, label, type, order, metadata }`;
	static readonly extendedFields = `extendedFields {
		id, value,
		selectorValues { id, value, ${ProductQueries.definition('fieldDefinition')} },
		${ProductQueries.definition('definition')}
	}`;

	// to be built at runtime via the buildQuery function
	static one = '';
	// to be built at runtime via the buildQuery function
	static many = '';

	static readonly update = `
		favorite
		lastUpdatedDate,
		archived,
		score
		${ProductQueries.status}
		${ProductQueries.votes}
		${ProductQueries.projects}
		${ProductQueries.comments}`;


	static buildQueries(userId: string) {
		ProductQueries.one = `
			name,
			description
			favorite,
			minimumOrderQuantity,
			moqDescription,
			lastUpdatedDate,
			score,
			leadTimeValue,
			leadTimeUnit,
			sample,
			incoTerm,
			harbour,
			masterCbm,
			reference,
			quantityPer20ft,
			quantityPer40ft,
			quantityPer40ftHC,
			creationDate,
			archived,
			deleted,
			${ProductQueries.attachments}
			${ProductQueries.extendedFields}
			${ProductQueries.category}
			${ProductQueries.comments}
			${ProductQueries.user('assignee')}
			${ProductQueries.user('createdBy')}
			${ProductQueries.user('lastUpdatedBy')}
			${ProductQueries.event}
			${ProductQueries.images}
			${ProductQueries.packaging('innerCarton')}
			${ProductQueries.packaging('masterCarton')}
			${ProductQueries.price('samplePrice')}
			${ProductQueries.price()}
			${ProductQueries.priceMatrix}
			${ProductQueries.projects}
			${ProductQueries.status}
			${ProductQueries.supplier}
			${ProductQueries.tags}
			${ProductQueries.votes}
			${ProductQueries.tasksLinked}
			${ProductQueries.samplesLinked}
			${ProductQueries.tasksLinkedUndone}
			${ProductQueries.tasksLinkedAssignedToMe(userId)}
			${ProductQueries.samplesLinkedAssignedToMe(userId)}
		`;

		ProductQueries.many = `
		name,
		description,
		creationDate,
		favorite,
		score,
		minimumOrderQuantity,
		lastUpdatedDate,
		reference,
		deleted,
		archived,
		deleted,
		${ProductQueries.comments},
		${ProductQueries.user('assignee')}
		${ProductQueries.user('createdBy')},
		${ProductQueries.user('lastUpdatedBy')},
		${ProductQueries.images},
		${ProductQueries.event},
		supplier { id, name },
		${ProductQueries.category},
		${ProductQueries.price()},
		${ProductQueries.packaging('innerCarton')}
		${ProductQueries.packaging('masterCarton')}
		${ProductQueries.status},
		${ProductQueries.votes},
		${ProductQueries.projects},
		${ProductQueries.tags}
		${ProductQueries.tasksLinked},
		${ProductQueries.samplesLinked},
		${ProductQueries.tasksLinkedAssignedToMe(userId)}
		${ProductQueries.samplesLinkedAssignedToMe(userId)}
		${ProductQueries.tasksLinkedUndone}
		`;
	}
}
