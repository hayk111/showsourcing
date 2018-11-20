import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '~global-services';
import { Product, ProductVote } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~shared/tracking-component/tracking-component';



@Component({
	selector: 'product-card-app',
	templateUrl: './product-card.component.html',
	styleUrls: ['./product-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent extends TrackingComponent implements OnInit, AfterViewInit {

	/** The link to display the element */
	link: string;
	/** The associated product */
	@Input() checked: boolean;
	/** The associated product */
	@Input() set product(product: Product) {
		this._product = product;
		this.computeLikes();
		this.computeScore();
		this.link = '/product/details' + this._product.id + '/general';
	}

	score: number;

	get product() {
		return this._product;
	}
	/** Some drag'n drop is in progress */
	@Input() dragInProgress: boolean;
	/** Highlight the card when checked */
	@Input() highlightOnChecked: boolean;
	/** Select when clicking on the whole card */
	@Input() selectFromCard: boolean;
	/** Whether a new content is displayed on hover */
	@Input() enabledHoverContent: boolean;
	/** Whether the product preview is accessibe from the card */
	@Input() enablePreviewLink: boolean;

	@Input() showCheckbox = true;
	@Input() clickable = false;

	/** Trigger the event to enable / disable drag'n drop to the container element */
	@Output() dragDropEnable = new EventEmitter<boolean>();
	/** Trigger the event when the element is selected via the checkbox */
	@Output() select = new EventEmitter<any>();
	/** Trigger the event when the element is unselected via the checkbox */
	@Output() unselect = new EventEmitter<any>();
	/** Trigger the event when the mouse enters the card */
	@Output() cardEnter = new EventEmitter<any>();
	/** Trigger the event when the mouse enters the card */
	@Output() cardLeave = new EventEmitter<any>();
	/** Trigger the event when the left image is clicked (to display preview for example) */
	@Output() clickImage = new EventEmitter<any>();

	@ContentChild(ContextMenuComponent) contextMenu: ContextMenuComponent;

	/** The drag'n drop enabled */
	dragDropEnabled = true;
	/** The contextual menu is opened */
	contextualMenuOpened = false;
	/** The checkbox is entered with the mouse */
	checkboxEntered = false;
	/** An interaction (check or uncheck) occured on the checkbox */
	checkboxAction = false;
	/** The mouse is over the card */
	cardEntered: boolean;
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
		private thumbSrv: ThumbService) {
		super();
	}

	ngOnInit() { }

	ngAfterViewInit() {
		if (this.checked && this.highlightOnChecked) {
			this.renderer.addClass(this.elementRef.nativeElement, 'highlight-checked');
		}
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

	/** Toggle the checkbox enter state */
	onToggleCheckbox(event) {
		this.checkboxEntered = !this.checkboxEntered;
		event.stopPropagation();
	}

	/** Toggle the drag'n drop enable state */
	toggleDragDropEnable(from, event) {
		if (from === 'checkbox') {
			this.onToggleCheckbox(event);
		}

		// Enable / disabe the drag'n drop
		if (!this.contextualMenuOpened && from === 'menu') {
			this.dragDropEnabled = !this.dragDropEnabled;
			this.dragDropEnable.emit(this.dragDropEnabled);
		} else if (!this.checkboxAction && from === 'checkbox') {
			this.dragDropEnabled = !this.dragDropEnabled;
			this.dragDropEnable.emit(this.dragDropEnabled);
		}

		// Reset the flag if an action on the checkbox just occured
		if (this.checkboxAction) {
			this.checkboxAction = !this.checkboxAction;
		}
	}

	/** Handle menu closing */
	onClickOutsideCard() {
		if (this.contextualMenuOpened) {
			this.contextualMenuOpened = !this.contextualMenuOpened;
			this.dragDropEnabled = true;
			this.dragDropEnable.emit(this.dragDropEnabled);
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
		this.dragDropEnabled = false;
		this.checked = true;
		this.checkboxAction = true;
		this.select.emit(this.product);
		if (this.checked && this.highlightOnChecked) {
			this.renderer.addClass(this.elementRef.nativeElement, 'highlight-checked');
		}
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.dragDropEnabled = false;
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.product);
		if (!this.checked && this.highlightOnChecked) {
			this.renderer.removeClass(this.elementRef.nativeElement, 'highlight-checked');
		}
	}

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

	leaveCard() {
		this.cardEntered = false;
		this.cardLeave.emit();
	}

	enterCard() {
		this.cardEntered = true;
		this.cardEnter.emit();
	}

	leaveMenuTrigger() {
		this.dragDropEnabled = true;
		this.dragDropEnable.emit(this.dragDropEnabled);
	}

	openProduct() {
		if (this.clickable && this.link) {
			this.router.navigate([this.link]);
		}
	}

	computeScore() {
		this.score = this.thumbSrv.computeScore(this.product);
	}

	computeLikes() {
		this.thumbsName = 'thumbs-up';
		this.like = false;
		this.dislike = false;
		if (this.product)
			this.userVote = (this.product.votes || []).find(v => v.user.id === this.userSrv.userSync.id);
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
