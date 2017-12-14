import { createSelector } from 'reselect';
import { selectFilesForTarget } from './file.selector';
import { entityRepresentationMap } from '../utils/entities.utils';


export const selectProducts = state => state.entities.products;

export const selectProductById = (id: string) => {
	return createSelector(
		[
			selectProducts,
			selectFilesForTarget({ entityId: id, entityRepr: entityRepresentationMap.product })
		],
		(products, attachments) => {
			return {
					...products.byId[id],
					attachments,
				};
		});
};

