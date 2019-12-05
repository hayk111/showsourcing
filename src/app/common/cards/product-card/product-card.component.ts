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
import { UserService } from '~entity-services';
import { Product, ProductVote } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { RatingService } from '~shared/rating/services/rating.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'product-card-app',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent extends TrackingComponent {

	/** The link to display the element */
	link: string;
	/** The associated product */
	private _checked: boolean;
	@Input() set checked(checked: boolean) {
		this._checked = checked;
		// this.setClassHighlightChecked(this._checked);
	}
	get checked() {
		return this._checked;
	}
	/** The associated product */
	@Input() set product(product: Product) {
		this._product = product;
		this.computeLikes();
		this.computeScore();
		this.link = '/product/' + this._product.id + '/general';
	}

	score: number;

	get product() {
		return this._product;
	}

	/** Highlight the card when checked */
	@Input() highlightOnChecked: boolean;
	/** Select when clicking on the whole card */
	@Input() selectFromCard: boolean;
	/** Whether a new content is displayed on hover */
	@Input() enabledHoverContent: boolean;
	/** Whether the product preview is accessibe from the card */
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
	userVote: ProductVote;
	private _product: Product;
	like = false;
	dislike = false;
	thumbsName = 'thumbs-up-white';

	constructor(
		private userSrv: UserService,
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private router: Router,
		public ratingSrv: RatingService
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
		this.select.emit(this.product);
		// this.setClassHighlightChecked(true);
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.product);
		// this.setClassHighlightChecked(false);
	}

	getPriceMoq(product: Product) {
		if (product) {
			return `
				${product.price || ''} ${product.price && product.minimumOrderQuantity ? '-' : ''} ${product.minimumOrderQuantity || ''}
			`;
		}

		return '';
	}

	/**
	 * add: boolean that determines if we add a class or remove a class
	 */
	private setClassHighlightChecked(add = false) {
		if (add && this.checked && this.highlightOnChecked)
			this.renderer.addClass(this.elementRef.nativeElement, 'highlight-checked');
		else if (!add && !this.checked && this.highlightOnChecked)
			this.renderer.removeClass(this.elementRef.nativeElement, 'highlight-checked');
	}

	openProduct() {
		if (this.clickable && this.link) {
			this.router.navigate([this.link]);
		}
	}

	computeScore() {
		this.score = this.ratingSrv.computeScore(this.product);
	}

	computeLikes() {
		this.thumbsName = 'thumbs-up';
		this.like = false;
		this.dislike = false;
		// some vote have user null because of the importer in the backend
		if (this.product)
			this.userVote = (this.product.votes || []).find(v => v.user && v.user.id === this.userSrv.userSync.id);
		if (this.userVote) {
			if (this.userVote.value === 100) {
				this.like = true;
				this.dislike = false;
				this.thumbsName = 'thumbs-up-background';
			} else {
				this.dislike = true;
				this.like = false;
				this.thumbsName = 'thumbs-down-background';
			}
		}
	}
}
