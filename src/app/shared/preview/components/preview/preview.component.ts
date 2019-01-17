import { Component, OnInit, ChangeDetectionStrategy, Input, AfterViewInit, Renderer2, ViewChild, ElementRef } from '@angular/core';

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
export class PreviewComponent implements AfterViewInit {

	@Input() align: 'left' | 'right' = 'right';
	/** wether the top image is fixed or not for the scrolling effect*/
	@Input() isFixed = true;
	@ViewChild('top') topSection: ElementRef<HTMLElement>;
	@ViewChild('scrollSection') scrollSection: ElementRef<HTMLElement>;

	constructor(private renderer: Renderer2) { }

	ngAfterViewInit() {
		// minus 6 so it goes a bit above the image
		// minus fifthy if there is a logo where that we want to display above the img
		if (this.isFixed) {
			const topHeight = this.topSection.nativeElement.getBoundingClientRect().height - 6 - 50;
			this.renderer.setStyle(this.scrollSection.nativeElement, 'margin-top', `${topHeight}px`);
		} else {
			this.renderer.setStyle(this.scrollSection.nativeElement, 'margin-top', `-50px`);
		}
	}

}
