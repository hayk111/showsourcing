import { ChangeDetectionStrategy, Component, Input, OnInit, Renderer2, ElementRef, AfterViewInit } from '@angular/core';

@Component({
	selector: 'divider-app',
	template: '',
	styleUrls: ['./divider.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		'role': 'separator',
		'[attr.aria-orientation]': 'vertical ? "vertical" : "horizontal"',
		'[class.vertical]': 'vertical',
	}
})
export class DividerComponent implements AfterViewInit {

	/** Whether the divider is vertically aligned. */
	@Input() vertical = false;
	@Input() height = 16;

	constructor(private renderer: Renderer2, private elRef: ElementRef) {}

	ngAfterViewInit() {
		if (this.vertical)
			this.renderer.setStyle(this.elRef.nativeElement, 'height', this.height + 'px');
	}

}
