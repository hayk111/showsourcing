import { Component, OnInit, ChangeDetectionStrategy, Input, ViewChild, ContentChild, TemplateRef } from '@angular/core';
import { CdkConnectedOverlay, ScrollStrategyOptions, ScrollStrategy } from '@angular/cdk/overlay';

/**
 * This selector is only the container of a selector/dropdown.
 *  We have to pass an items array of data
 *	we have to scope this component around :
 *  - the item template who will be looped : <ng-template let-item><single-item-app [item]="item"></></>
 *  - the trigger component (with trigger attribute) to open the selector : <trigger-app trigger>
 **/
@Component({
	selector: 'selector-overlay-app',
	templateUrl: './selector-overlay.component.html',
	styleUrls: ['./selector-overlay.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectorOverlayComponent implements OnInit {
	@ViewChild(CdkConnectedOverlay, {static: true}) cdkConnectedOverlay: CdkConnectedOverlay;

	// give the possibility to pass a ng-template to be used as item in *ngFor
	@ContentChild(TemplateRef, {static: true})
	itemTemplate: TemplateRef<any>;

	/** close: close the selector on scroll
	 *  reposition: the selector move with the scroll
	 * 	block: we can't scroll the page
	 *  noop: do nothing
	 */
	@Input() scrollOption: 'close' | 'block' | 'noop' | 'reposition' = 'close';
	scrollStrategy: ScrollStrategy;

	// custom classes for the overlay container displayed
	@Input() containerClass: string;

	@Input() isOpen = false;
	@Input() items: any[];

	constructor(private scrollStrategyOptions: ScrollStrategyOptions) {}

	ngOnInit(): void {
		this.scrollStrategy = this.scrollStrategyOptions[this.scrollOption]();
	}

	open() {
		this.isOpen = true;
	}
	close() {
		this.isOpen = false;
	}
}
