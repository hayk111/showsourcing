import { createSelector } from 'reselect';
import { selectProductStatuses } from './product-status.selector';
import { selectCategories } from './categories.selector';
import { selectEvents } from './events.selector';
import { selectSuppliers } from './suppliers.selector';
import { selectTeams } from './teams.selector';
import { selectTags } from './tags.selector';
import { selectProjects } from './projects.selector';
import { selectEntityById } from '../misc/utils.selector';
import { selectComments } from './comments.selector';
import { selectImages } from './image.selector';
import { selectFiles } from './file.selector';
import { deepCopy } from '../../utils/deep-copy.utils';
import { EntityState, entityRepresentationMap } from '../../utils/entities.utils';
import { Product } from '../../model/entities/product.model';


export const selectProducts = state => state.entities.products;

export const selectProductById = (id: string) => {
	const target = { entityId: id, entityRepr: entityRepresentationMap.product };
	return createSelector(
		[
			selectEntityById(target),
			selectEvents,
			selectSuppliers,
			selectCategories,
			selectTeams,
			selectTags,
			selectComments,
			selectProjects,
			selectImages,
			selectFiles,
		],
		(products, eventsEntity, suppliersEntity, categoriesEntity, teamsEntity,
			tagsEntity, commentsEntity, projectsEntity, imagesEntity, filesEntity) => {

			const product: Product = products.byId[id];
			if (product)
				return {
						...product,
						events: eventsEntity.byId[product.eventId],
						supplier: suppliersEntity.byId[product.supplierId],
						category: categoriesEntity.byId[product.categoryId],
						team: teamsEntity.byId[product.teamId],
						project: product.projectIds.map(idx => projectsEntity.byId[id]),
						tags: product.tagIds.map(idx => tagsEntity.byId[id]),
						comments: product.commentIds.map(idx => commentsEntity.byId[id]),
						files: product.fileIds.map(idx => filesEntity.byId[id]),
						images: product.imageIds.map(idx => imagesEntity.byId[id])
					};
			else
				return undefined;
		});
};


function selectArrayFromIds(ids: Array<string>, entityState: EntityState<any>) {
	ids.map(id => entityState.byId[id]);
}

export const selectProductByStatus = createSelector(
	[
		selectProducts,
		selectProductStatuses
	],
	(products: EntityState<Product>, statuses: EntityState<any>) => {
		const statusAndProds = deepCopy(statuses.byId);
		Object.values(statusAndProds).forEach(s => s.products = []);
		products.ids.forEach(id => {
			const product = products.byId[id];
			// add empty array of products
			// find the correct status
			const status4Prod = statusAndProds[product.status];
			if (status4Prod)
				status4Prod.products.push(product);
		});
		return Object.values(statusAndProds);
	}
);


export const selectProductsWithNames = createSelector(
	[
		selectProducts,
		selectCategories,
		selectEvents,
		selectSuppliers
	],
	(products, categories, events, suppliers) => {
		const returned = [];
		products = deepCopy(products);
		products.ids.forEach(id => {
			const product = products.byId[id];
			const supplier = suppliers.byId[product.supplierId];
			const event = events.byId[product.eventId];
			const category = categories.byId[product.category.id];
			product.supplierName = supplier ? supplier.name : '';
			product.eventName = event ? event.name : '';
			product.categoryName = category ? category.name : '';
			returned.push(product);
		});
		return returned;
	}
);


