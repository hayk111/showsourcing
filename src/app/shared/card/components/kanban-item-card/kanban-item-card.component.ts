

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output,
	TemplateRef,
	HostBinding,
	ContentChild
} from '@angular/core';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { Price, Product, ProductVote } from '~models';

@Component({
	selector: 'kanban-item-card-app',
	templateUrl: './kanban-item-card.component.html',
	styleUrls: ['./kanban-item-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class KanbanItemCardComponent {

	/** The main title */
	@Input() title: string;
	/** The sub title */
	@Input() subtitle1: string;
	/** The sub title */
	@Input() description: string;
	/** The category */
	@Input() category: string;
	/** The status displayed into a tiny label */
	@Input() status: string;
	/** The price */
	@Input() price: Price;
	/** The minimum order quantity */
	@Input() minimumOrderQuantity: number;
	/** The image url */
	@Input() image: string;
	/** The icon name */
	@Input() icon: string;
	/** The link to display the element */
	@Input() link: string;
	/** The person associated with the element */
	@Input() person: any;
	/** The associated product */
	@Input() checked: boolean;
	/** Is favorite */
	@Input() favorite: boolean;
	/** The item is checked */
	@Input() tags: any;
	/** The associated product */
	@Input() product: Product;

	/** Trigger the event to enable / disable drag'n drop to the container element */
	@Output() dragDropEnable = new EventEmitter<boolean>();
	/** Trigger the event when the element is selected via the checkbox */
	@Output() select = new EventEmitter<any>();
	/** Trigger the event when the element is unselected via the checkbox */
	@Output() unselect = new EventEmitter<any>();

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

	/** Toogle the drag'n drop enable state */
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

	/** Handle checbkox check event */
	onChecked() {
		this.dragDropEnabled = false;
		this.checked = true;
		this.checkboxAction = true;
		this.select.emit();
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.dragDropEnabled = false;
		this.checked = true;
		this.checkboxAction = true;
		this.unselect.emit();
	}

	/** Disable defaut drag for element */
	preventDrag(event) {
		event.preventDefault();
		return false;
	}

	leaveCard() {
		this.cardEntered = false;
	}

	enterCard() {
		this.cardEntered = true;
	}

	leaveMenuTrigger() {
		this.dragDropEnabled = true;
		this.dragDropEnable.emit(this.dragDropEnabled);
	}

	enterMenuTrigger() {
		this.dragDropEnabled = false;
		this.dragDropEnable.emit(this.dragDropEnabled);
	}
}
