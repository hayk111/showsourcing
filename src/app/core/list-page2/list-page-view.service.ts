import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Typename } from '~core/erm3/typename.type';
import { View } from '~shared/controller-table/components';

@Injectable({
	providedIn: 'root'
})
export class ListPageViewService<T> {
	/** current view */
	view = 'table';
	/** whether the filter panel is visible */
	filterPanelOpen: boolean;

	/** whether the preview panel is visible, the preview panel is the panel that opens
	 * when clicking an item in the table
	*/
	previewOpen = false;

	/** previewed item */
	previewed: T;

	typename: Typename;
	/** where we go to view an item */
	destUrl: string;

	constructor(
		private router: Router
	) { }

	setup({ typename, destUrl, view }: { typename: Typename, destUrl: string, view: View }) {
		this.typename = typename;
		this.destUrl = destUrl;
		this.view = view;
	}

	/** opens the preview panel for an item */
	openPreview(item: T) {
		this.previewed = item;
		this.previewOpen = true;
	}

	/** closes the preview */
	closePreview() {
		this.previewOpen = false;
	}

	/** Open details page of a product */
	goToDetails(itemId: string) {
		console.log('goToDetails -> itemId', itemId);
		this.router.navigate(['/', this.destUrl, itemId]);
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
	changeView(view: View) {
		this.view = view;
		// this.router.navigate([this.destUrl, view]);
	}
}
