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
import { Sample } from '~models';
import { ContextMenuComponent } from '~shared/context-menu/components/context-menu/context-menu.component';
import { ThumbService } from '~shared/rating/services/thumbs.service';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-card-app',
	templateUrl: './sample-card.component.html',
	styleUrls: ['./sample-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SampleCardComponent extends TrackingComponent {

	/** The link to display the element */
	link: string;
	/** The associated sample */
	private _checked: boolean;
	@Input() set checked(checked: boolean) {
		this._checked = checked;
		// this.setClassHighlightChecked(this._checked);
	}
	get checked() {
		return this._checked;
	}
	/** The associated sample */
	@Input() set sample(sample: Sample) {
		this._sample = sample;
		this.link = '/sample/' + this._sample.id + '/general';
	}

	score: number;

	get sample() {
		return this._sample;
	}

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


	/** The contextual menu is opened */
	contextualMenuOpened = false;
	/** An interaction (check or uncheck) occured on the checkbox */
	checkboxAction = false;
	/** The user vote if any */
	private _sample: Sample;
	like = false;
	dislike = false;
	thumbsName = 'thumbs-up-white';

	constructor(
		private userSrv: UserService,
		private elementRef: ElementRef,
		private renderer: Renderer2,
		private router: Router,
		private thumbSrv: ThumbService
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
		// this.setClassHighlightChecked(true);
	}

	getAvgVotes(votes: any[]): number {
		if (!votes || !votes.length) {
			return -1;
		}

		const votesVals = votes.map(vote => vote.value);
		const sum = votesVals.reduce((votePrev, voteNext) => votePrev + voteNext, 0);
		return Math.round( sum / votes.length * 10 ) / 10;
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.sample);
		// this.setClassHighlightChecked(false);
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

	openSample() {
		if (this.clickable && this.link) {
			this.router.navigate([this.link]);
		}
	}
}
