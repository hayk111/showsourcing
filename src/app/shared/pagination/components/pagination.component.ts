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
	@Input() sections;
	// whether the table is currently loading
	@Input() pending = false;
	// whether rows are selectable
	/** how many items were skipped so we can display the pages */
	@Input() skipped: number;

	@Output() previous = new EventEmitter<undefined>();
	@Output() next = new EventEmitter<undefined>();
	@Output() goToPage = new EventEmitter<number>();

	itemsPerPage = DEFAULT_TAKE_PAGINATION;
	// current index of the pagination
	@Input() indexPagination = 0;
	@Input() totalSections = 1;

	/** Trackby function for ngFor */
	trackByFn(index, section) {
		return index;
	}
}
