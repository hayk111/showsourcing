import { createSelector } from 'reselect';
import { selectProducts } from '../entities/products.selector';
import { EntityTarget, EntityState, entityStateToArray } from '../../utils/entities.utils';
import { Product } from '../../model/entities/product.model';



export const selectCurrentSelection = state => state.selection.currentSelection.target;

// we only need arrays here
export const selectFilesForSelection = state => state.selection.files;
export const selectFilesArrayForSelection = createSelector([ selectFilesForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});

export const selectTasksForSelection = state => state.selection.tasks;
export const selectTaskArrayForSelection = createSelector([ selectTasksForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});
export const selectNumTasksForSelection = createSelector([ selectTaskArrayForSelection ], (tasks: Array<any>) => {
	return tasks.length;
});


export const selectProjectsForSelection = state => state.selection.projects;
export const selectProjectsArrayForSelection = createSelector([ selectProjectsForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});

export const selectImagesForSelection = state => state.selection.images;
export const selectImagesArrayForSelection = createSelector([ selectImagesForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});

export const selectTagsForSelection = state => state.selection.tags;
export const selectTagsArrayForSelection = createSelector([ selectTagsForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});

export const selectCommentsForSelection = state => state.selection.comments;
export const selectCommentsArrayForSelection = createSelector([ selectCommentsForSelection ], (filesState) => {
	return entityStateToArray(filesState);
});

export const selectNumCommentsForSelection = createSelector([ selectCommentsArrayForSelection ], (comments: Array<any>) => {
	return comments.length;
});

export const selectVotesForSelection = state => state.selection.votes;
export const selectVotesArrayForSelection = createSelector([ selectVotesForSelection ], (filesState) => {
	entityStateToArray(filesState);
});

export const selectProductSelected = createSelector(
	[
		selectProducts,
		selectCurrentSelection
	],
	(productState: EntityState<Product>, selection: EntityTarget ) => {
		if (!selection)
			return undefined;
		return productState.byId[selection.entityId];
	}
);
