import { createSelector } from 'reselect';
import { selectProducts } from '../entities/products.selector';
import { EntityTarget, EntityState } from '../../utils/entities.utils';
import { Product } from '../../model/entities/product.model';


export const selectCurrentSelection = state => state.selection.currentSelection;

export const selectFilesForSelection = state => state.selection.files;

export const selectTasksForSelection = state => state.selection.tasks;

export const selectProjectsForSelection = state => state.selection.projects;

export const selectImagesForSelection = state => state.selection.images;

export const selectTagsForSelection = state => state.selection.tags;

export const selectCommentsForSelection = state => state.selection.comments;

export const selectVotesForSelection = state => state.selection.votes;


export const selectProductSelected = createSelector(
	[
		selectProducts,
		selectCurrentSelection
	],
	(productState: EntityState<Product>, selection: EntityTarget) => {
		return productState.byId[selection.entityId];
	}
);
