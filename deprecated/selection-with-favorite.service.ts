import { Injectable } from '@angular/core';
import { SelectionService } from '~core/list-page/selection.service';


@Injectable()
export class SelectionWithFavoriteService extends SelectionService {
	/** if all the selected items are favorite or not, to display a heart.
	 * true by default for convenience, doesn't affect end result */
	allSelectedFavorite = true;

	/** Selects an entity
	*  @param checkFavorite is used when you select a entity with favorite field
	*  and want to check if the selection bar should display a colorful heart or not */
	selectOne(entity: any, checkFavorite = false) {
		// we check only if the status is true since we only need to check if the next item will convert the select heart
		// into false
		if (checkFavorite && this.allSelectedFavorite)
			this.allSelectedFavorite = entity.favorite ? true : false;
		super.selectOne(entity);
	}

	/** Unselects an entity
	 *  @param checkFavorite is used when you unselect a entity with favorite field
	 *  and want to check if the selection bar should display a colorful heart or not */
	unselectOne(entity: any, checkFavorite = false) {
		// we only check when the current status of the heart is false and when the unselected item is false too
		// this is because the only way it can be converted to true is by checking that the last item wasn't preventing
		// the heart of being true
		if (checkFavorite && (!this.allSelectedFavorite && !entity.favorite))
			this.allSelectedFavorite = !this.getSelectionValues()
				.some(item => item.id !== entity.id && !item.favorite);
		super.unselectOne(entity);
	}

	/** Select all entity */
	selectAll(entities: any[], checkFavorite = false) {
		// we check for each item if it has unfavorite, if it has we stop looking and update the icon to false
		if (checkFavorite && this.allSelectedFavorite) {
			this.allSelectedFavorite = entities.every(entity => entity.favorite);
		}
		super.selectAll(entities);
	}

	/** Unselect all entity */
	unselectAll() {
		this.allSelectedFavorite = true;
		super.unselectAll();
	}

}
