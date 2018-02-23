import { createSelector } from "reselect";
import { entityStateToArray } from "@store";

export const selectCommentsForCurrentTarget = state => state.foccussedEntity.comments;

export const selectCommentsArrayForCurrentTarget = createSelector(
	[selectCommentsForCurrentTarget],
	commentState => {
		return entityStateToArray(commentState);
	}
);

export const selectNumCommentsForCurrentTarget = createSelector(
	[selectCommentsArrayForCurrentTarget],
	(comments: Array<any>) => {
		return comments.length;
	}
);