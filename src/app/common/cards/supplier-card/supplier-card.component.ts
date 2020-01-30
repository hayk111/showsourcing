import {
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '~core/ORM/services';
import { Supplier } from '~core/ORM/models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { RatingService } from '~shared/rating/services/rating.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'supplier-card-app',
	templateUrl: './supplier-card.component.html',
	styleUrls: ['./supplier-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SupplierCardComponent extends TrackingComponent {

	/** The link to display the element */
	link: string;
	/** The associated supplier */
	private _checked: boolean;
	@Input() set checked(checked: boolean) {
		this._checked = checked;
		// this.setClassHighlightChecked(this._checked);
	}
	get checked() {
		return this._checked;
	}
	/** The associated supplier */
	@Input() set supplier(supplier: Supplier) {
		this._supplier = supplier;
		this.computeScore();
		this.link = '/supplier/' + this._supplier.id + '/general';
	}

	score: number;

	get supplier() {
		return this._supplier;
	}

	/** Highlight the card when checked */
	@Input() highlightOnChecked: boolean;
	/** Select when clicking on the whole card */
	@Input() selectFromCard: boolean;
	/** Whether a new content is displayed on hover */
	@Input() enabledHoverContent: boolean;
	/** Whether the supplier preview is accessibe from the card */
	@Input() enablePreviewLink: boolean;
	@Input() dragInProgress: boolean;

	@Input() showCheckbox = true;

	@Input() clickable = false;

	/** Trigger the event when the element is selected via the checkbox */
	@Output() select = new EventEmitter<any>();
	/** Trigger the event when the element is unselected via the checkbox */
	@Output() unselect = new EventEmitter<any>();
	/** Trigger the event when the left image is clicked (to display preview for example) */
	@Output() clickImage = new EventEmitter<any>();

	@ContentChild(ContextMenuComponent, { static: false }) contextMenu: ContextMenuComponent;


	/** The contextual menu is opened */
	contextualMenuOpened = false;
	/** An interaction (check or uncheck) occured on the checkbox */
	checkboxAction = false;
	/** The user vote if any */
	private _supplier: Supplier;
	like = false;
	dislike = false;
	thumbsName = 'thumbs-up-white';

	constructor(
		private userSrv: UserService,
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private router: Router,
		private ratingSrv: RatingService
	) {
		super();
	}

	/** Click the title bloc */
	clickTitle() {
		if (this.selectFromCard) {
			this.toggleChecked();
		}
	}

	/** Toggle the open menu state */
	onToggleContextualMenu(event) {
		this.contextualMenuOpened = !this.contextualMenuOpened;
		event.stopPropagation();
	}



	/** Handle menu closing */
	onClickOutsideCard() {
		if (this.contextualMenuOpened) {
			this.contextualMenuOpened = !this.contextualMenuOpened;
		}
	}

	/** Toggle checked */
	toggleChecked() {
		if (this.checked) {
			this.onUnchecked();
		} else {
			this.onChecked();
		}
	}

	/** Handle checbkox check event */
	onChecked() {
		this.checked = true;
		this.checkboxAction = true;
		this.select.emit(this.supplier);
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.supplier);
	}

	openSupplier() {
		if (this.clickable && this.link) {
			this.router.navigate([this.link]);
		}
	}

	computeScore() {
		this.score = this.ratingSrv.computeScore(this.supplier);
	}
}
