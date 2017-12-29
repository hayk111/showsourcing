import { createSelector } from 'reselect';
import { selectFilesForTarget } from './file.selector';
import { entityRepresentationMap } from '../utils/entities.utils';
import { selectImagesForTarget } from './image.selector';


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

