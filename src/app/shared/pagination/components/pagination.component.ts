import {
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	EventEmitter,
	HostListener,
	Input,
	OnChanges,
	Output,
	QueryList,
	TemplateRef,
	OnInit,
} from '@angular/core';
import { DEFAULT_TAKE_PAGINATION } from '~core/entity-services/_global/select-params';

@Component({
	selector: 'pagination-app',
	templateUrl: './pagination.component.html',
	styleUrls: ['./pagination.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {

	/** Different rows displayed */
	@Input() rows;
	/** how many items were skipped so we can display the pages */
	@Input() skipped: number;

	@Input() totalSections = 1;

	/** how many pages our pagination will have */
	sections: Array<number> = [0];
	/** items that we will see per page */
	itemsPerPage = DEFAULT_TAKE_PAGINATION;
	/** current index of the pagination */
	currentIndex = 0;
	/** number of pages displayed on either sides of the current page */
	sideItems = 5;

	/** total number of items for pagination */
	@Input()
	set count(count: number) {
		this._count = count;
		this.totalSections = Math.ceil(this._count / this.itemsPerPage);
		if (this.skipped)
		this.currentIndex = this.skipped / this.itemsPerPage;
		this.setPageIndex();
	}
	get count() {
		return this._count;
	}
	private _count = 0;

	@Output() goToPage = new EventEmitter<number>();

	setPageIndex() {
		const width = Math.min(this.sideItems * 2 + 1, this.totalSections);
		const leftIndex = Math.max(this.currentIndex - this.sideItems, 0);
		const pages = [];
		// we want to readd items from the right to the left (-1 since we don't take into account the last index)
		const rightAmount = Math.min(this.sideItems, ((this.totalSections - 1) - this.currentIndex));

		let cursor = Math.max(leftIndex - (this.sideItems - rightAmount), 0);

		while ((pages.length < width) && (cursor <= this.totalSections)) {
			pages.push(cursor);
			cursor++;
		}
		this.sections = pages.length ? pages : [0];
	}

	goToIndexPage(index, disabled?: boolean) {
		if (!disabled) {
			this.currentIndex = index;
			this.setPageIndex();
			this.goToPage.emit(index);
		}
	}

	resetIndex() {
		this.currentIndex = 0;
	}
}
