import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Sample } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-card-app',
	templateUrl: './sample-card.component.html',
	styleUrls: ['./sample-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'[class.pointer]': 'clickable || enabledHoverContent'
	}
})
export class SampleCardComponent extends TrackingComponent {

	/** The associated sample */
	private _checked: boolean;
	@Input() set checked(checked: boolean) {
		this._checked = checked;
	}
	get checked() {
		return this._checked;
	}
	/** The associated sample */
	@Input() sample: Sample;
	/** Highlight the card when checked */
	@Input() highlightOnChecked: boolean;
	/** Select when clicking on the whole card */
	@Input() selectFromCard: boolean;
	/** Whether a new content is displayed on hover */
	@Input() enabledHoverContent: boolean;
	/** Whether the sample preview is accessibe from the card */
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


	score: number;
	/** The contextual menu is opened */
	contextualMenuOpened = false;
	/** An interaction (check or uncheck) occured on the checkbox */
	checkboxAction = false;
	like = false;
	dislike = false;
	thumbsName = 'thumbs-up-white';

	constructor(
		private router: Router
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
		this.select.emit(this.sample);
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.sample);
	}
}
