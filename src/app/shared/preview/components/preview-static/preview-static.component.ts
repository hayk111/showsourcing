import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	Input,
	OnInit,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'preview-static-app',
	templateUrl: './preview-static.component.html',
	styleUrls: ['./preview-static.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: { class: 'card-shadow' }
})
export class PreviewStaticComponent implements OnInit, AfterViewInit {
	@Input() hasLogo = false;

	@ViewChild('top', { static: false }) topSection: ElementRef<HTMLElement>;
	@ViewChild('scrollSection', { static: false }) scrollSection: ElementRef<HTMLElement>;
	constructor(private renderer: Renderer2) { }

	ngOnInit() {
	}

	ngAfterViewInit() {
		// minus 6 so it goes a bit above the image
		// minus fifthy if there is a logo where that we want to display above the img
		if (this.hasLogo) {
			this.renderer.setStyle(this.scrollSection.nativeElement, 'margin-top', `-50px`);
		}
	}

}
