

import {
	ChangeDetectionStrategy,
	Component,
	EventEmitter,
	Injectable,
	Input,
	OnInit,
	Output,
	TemplateRef
} from '@angular/core';

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
	@Input() subtitle2: string;
	/** The status displayed into a tiny label */
	@Input() status: string;
	/** The image url */
	@Input() image: string;
	/** The icon name */
	@Input() icon: string;
	/** The link to display the element */
	@Input() link: string;
	/** The person associated with the element */
	@Input() person: any;
	/** The reference to the contextual menu content */
	@Input() contextualMenu: TemplateRef<any>;

	/** Trigger the event to enable / disable drag'n drop to the container element */
	@Output() dragDropEnable = new EventEmitter<boolean>();
	/** Trigger the event when the element is selected via the checkbox */
	@Output() select = new EventEmitter<any>();
	/** Trigger the event when the element is unselected via the checkbox */
	@Output() unselect = new EventEmitter<any>();

	/** The drag'n drop enabled */
	dragDropEnabled = true;
	/** The contextual menu is opened */
	contextualMenuOpened = false;

	/**  */
	onToggleContextualMenu(event) {
		this.contextualMenuOpened = !this.contextualMenuOpened;
		event.stopPropagation();
	}

	toggleDragDropEnable() {
		if (!this.contextualMenuOpened) {
			this.dragDropEnabled = !this.dragDropEnabled;
			this.dragDropEnable.emit(this.dragDropEnabled);
		}
	}

	onClickOutsideCard() {
		if (this.contextualMenuOpened) {
			this.contextualMenuOpened = !this.contextualMenuOpened;
			this.dragDropEnabled = true;
			this.dragDropEnable.emit(this.dragDropEnabled);
		}
	}
}
