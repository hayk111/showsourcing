import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ContentChild,
	ContentChildren,
	ElementRef,
	Input,
	OnInit,
	QueryList,
	Renderer2,
	ViewChild,
} from '@angular/core';
import { PreviewService } from '~shared/preview/services/preivew.service';
import { AutoUnsub } from '~utils';

import { PreviewTabComponent } from '../preview-tab/preview-tab.component';

@Component({
	selector: 'preview-app',
	templateUrl: './preview.component.html',
	styleUrls: ['./preview.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'z-2',
		'[class.alignRight]': 'align === "right"',
		'[class.alignLeft]': 'align === "left"'
	}
})
export class PreviewComponent extends AutoUnsub implements OnInit, AfterViewInit {

	@Input() align: 'left' | 'right' = 'right';
	@Input() hasLogo = false;
	@Input() isPreview = true;

	@ViewChild('top', { static: false }) topSection: ElementRef<HTMLElement>;
	@ViewChild('scrollSection', { static: false }) scrollSection: ElementRef<HTMLElement>;

	// Tabs that are used on the preview
	@ContentChild('tab1', { static: false }) tab1: PreviewTabComponent;
	@ContentChild('tab2', { static: false }) tab2: PreviewTabComponent;
	@ContentChild('tab3', { static: false }) tab3: PreviewTabComponent;

	// Content of the tabs
	@ContentChildren('contentTab1', { read: ElementRef }) contentTab1: QueryList<ElementRef>;
	@ContentChildren('contentTab2', { read: ElementRef }) contentTab2: QueryList<ElementRef>;
	@ContentChildren('contentTab3', { read: ElementRef }) contentTab3: QueryList<ElementRef>;

	constructor(private renderer: Renderer2, private previewSrv: PreviewService) { super(); }

	ngOnInit() {
		this.previewSrv.selectedTab$.subscribe(number => this.updateTabContent(number));
	}

	ngAfterViewInit() {
		// minus 6 so it goes a bit above the image
		// minus fifthy if there is a logo where that we want to display above the img
		if (this.isPreview) {
			let topHeight = this.topSection.nativeElement.getBoundingClientRect().height - 6;
			if (this.hasLogo)
				topHeight -= 50;
			this.renderer.setStyle(this.scrollSection.nativeElement, 'margin-top', `${topHeight}px`);
		} else if (this.hasLogo) {
			this.renderer.setStyle(this.scrollSection.nativeElement, 'margin-top', `-50px`);
		}

		// we initialize the first tab if it exists
		if (this.tab1)
			this.updateTabContent(1);
	}

	/** Updates the content of the tab and the tab style */
	private updateTabContent(number: number) {
		let contentTab: QueryList<ElementRef>;
		let tab: PreviewTabComponent;
		switch (number) {
			case 1:
				contentTab = this.contentTab1;
				tab = this.tab1;
				break;
			case 2:
				contentTab = this.contentTab2;
				tab = this.tab2;
				break;
			case 3:
				contentTab = this.contentTab3;
				tab = this.tab3;
				break;
			default:
				throw Error(`There is no tab with number ${number}`);
		}
		if (contentTab && tab) {
			this.unselectTabs();
			this.selectTab(contentTab.toArray());
			this.unsetActiveTabs();
			this.setActiveTab(tab);
		}
	}

	/** updates the tab content style so its displayed */
	private selectTab(tabs: ElementRef[]) {
		tabs.forEach(tab => {
			if (tab.nativeElement)
				this.renderer.setStyle(tab.nativeElement, 'display', 'block');
		});
	}

	/** updates the all of the tabs content style so it is not displayed */
	private unselectTabs() {
		const concatArrays = this.contentTab1.toArray().concat(this.contentTab2.toArray(), this.contentTab3.toArray());
		concatArrays.forEach(tab => {
			if (tab.nativeElement)
				this.renderer.setStyle(tab.nativeElement, 'display', 'none');
		});
	}

	/** updates the style of the current tab to active */
	private setActiveTab(tab: PreviewTabComponent) {
		if (tab)
			tab.setActiveClass();
	}

	/** updates all the tabs style so they are inactive */
	private unsetActiveTabs() {
		const tabArray = [this.tab1, this.tab2, this.tab3];
		tabArray.forEach(tab => {
			if (tab)
				tab.unsetActiveClass();
		});
	}

}
