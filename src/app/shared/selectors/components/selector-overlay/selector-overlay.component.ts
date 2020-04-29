import {
	Component,
	OnInit,
	ChangeDetectionStrategy,
	Input,
	ViewChild,
	ContentChild,
	TemplateRef,
	Output,
	EventEmitter
} from '@angular/core';
import { CdkConnectedOverlay, ScrollStrategyOptions, ScrollStrategy } from '@angular/cdk/overlay';

/**
 * This selector is only the container of a selector/dropdown.
 *  We have to :
 *  !- pass an items array of data
 *  !- specify the item template who will be looped :
 * 		pass [itemTemplate]="ref" + <ng-template #ref let-item><single-item-app [item]="item"></></>
 *	and scope these components :
 *  !- the trigger component (with trigger attribute) to open the selector : <trigger-app trigger>
 *  - optionaly a component with attribute 'search'
 *  - optionaly a component with attribute 'footer'
 **/
@Component({
	selector: 'selector-overlay-app',
	templateUrl: './selector-overlay.component.html',
	styleUrls: ['./selector-overlay.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorOverlayComponent implements OnInit {
	@ViewChild(CdkConnectedOverlay, { static: true }) cdkConnectedOverlay: CdkConnectedOverlay;

	// give the possibility to pass a ng-template to be used as item in *ngFor
	@ContentChild(TemplateRef, { static: true }) itemTemplateRef;
	@Input() itemTemplate: TemplateRef<any>;

	/** close: close the selector on scroll
	 *  reposition: the selector move with the scroll
	 * 	block: we can't scroll the page
	 *  noop: do nothing
	 */
	@Input() scrollOption: 'close' | 'block' | 'noop' | 'reposition' = 'close';
	scrollStrategy: ScrollStrategy;

	// custom classes for global, search, items and footer containers
	@Input() globalContainerClass = 'global-container';
	@Input() itemsContainerClass = '';

	@Input() items: any[];
	@Input() isOpen = false;
	@Output() opened = new EventEmitter();

	constructor(private scrollStrategyOptions: ScrollStrategyOptions) {}

	ngOnInit(): void {
		this.scrollStrategy = this.scrollStrategyOptions[this.scrollOption]();
		// set the template for the item loop
		this.itemTemplateRef = this.itemTemplate;
	}

	open() {
		this.isOpen = true;
		this.opened.emit();
	}
	close() {
		this.isOpen = false;
	}
}
