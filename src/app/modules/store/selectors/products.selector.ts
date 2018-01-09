import { createSelector } from 'reselect';
import { entityRepresentationMap, EntityState } from '../utils/entities.utils';
import { Product } from '../model/product.model';
import { selectProductStatuses } from './product-status.selector';
import { deepCopy } from '../utils/deep-copy.utils';
import { selectFilesForTarget } from './target/file.selector';
import { selectImagesForTarget } from './target/image.selector';


export const selectProducts = state => state.entities.products;

export const selectProductById = (id: string) => {
	const target = { entityId: id, entityRepr: entityRepresentationMap.product };
	return createSelector(
		[
			selectProducts,
			selectFilesForTarget(target),
			selectImagesForTarget(target)
		],
		(products, files, images) => {
			if (products.byId[id])
				return {
						...products.byId[id],
						files,
						images
					};
			else
				return undefined;
		});
};


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
