import { Component, OnInit, Input, Output, EventEmitter, ElementRef, ViewChild, AfterViewInit, Renderer2 } from '@angular/core';

@Component({
	selector: 'input-description-app',
	templateUrl: './input-description.component.html',
	styleUrls: ['./input-description.component.scss']
})
export class InputDescriptionComponent implements AfterViewInit {
	@Input() description = '';
	@Input() hasLabel = false;
	@Output() update = new EventEmitter<string>();

	@ViewChild('container') container: ElementRef<HTMLElement>;

	showMore = false;

	constructor(private render: Renderer2) { }

	ngAfterViewInit() {
		if (this.container.nativeElement.clientHeight > 85 && !this.showMore) {
			this.render.setStyle(this.container.nativeElement, 'height', '85px');
			this.showMore = true;
		}
	}

	updateDescription(isCancel: boolean = true, newDescription: string) {
		if (!isCancel) {
			this.update.emit(newDescription);
		}
	}

	showAll() {
		this.render.setStyle(this.container.nativeElement, 'height', '100%');
		this.showMore = false;
	}
}
