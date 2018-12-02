import { Injectable, Optional, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { EntityMetadata, ERM_TOKEN } from '~models';

@Injectable({
	providedIn: 'root'
})
export class ListPageViewService<T> {
	/** current view */
	view: 'list' | 'card' = 'list';
	/** whether the filter panel is visible */
	filterPanelOpen: boolean;

	/** whether the preview panel is visible, the preview panel is the panel that opens
	 * when clicking an item in the table
	*/
	previewOpen: boolean;
	/** previewed item */
	previewed: T;

	constructor(
		private router: Router,
		@Optional() @Inject(ERM_TOKEN) public entityMetadata: EntityMetadata
	) { }

	/** opens the preview panel for an item */
	openPreview(item: T) {
		this.previewed = item;
		console.log(this.previewed);
		this.previewOpen = true;
	}

	/** closes the preview */
	closePreview() {
		this.previewOpen = false;
	}

	/** Open details page of a product */
	goToDetails(itemId: string) {
		this.router.navigate([this.entityMetadata.singular, 'details', itemId]);
	}

	/** when filter button is clicked at the top we open the panel */
	openFilterPanel() {
		this.filterPanelOpen = true;
	}

	/** When we need to close the filter panel */
	closeFilterPanel() {
		this.filterPanelOpen = false;
	}

	/** Whenever we switch from list to card view
	 * @param view the view we want to change to either list or card view
	*/
	changeView(view: 'list' | 'card') {
		this.view = view;
	}
}
