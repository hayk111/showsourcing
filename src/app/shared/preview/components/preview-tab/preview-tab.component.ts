import { Component, OnInit, ChangeDetectionStrategy, ElementRef, Renderer2 } from '@angular/core';

@Component({
	selector: 'preview-tab-app',
	templateUrl: './preview-tab.component.html',
	styleUrls: ['./preview-tab.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PreviewTabComponent implements OnInit {

	// we use this element to set the active class
	constructor(private element: ElementRef, private renderer: Renderer2) { }

	ngOnInit() {
	}

	setActiveClass() {
		this.renderer.addClass(this.element.nativeElement, 'active');
	}

	unsetActiveClass() {
		this.renderer.removeClass(this.element.nativeElement, 'active');
	}

}
