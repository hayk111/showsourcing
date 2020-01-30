import { Component, OnInit, EventEmitter, ChangeDetectionStrategy, Input, Output } from '@angular/core';
import { AppImage } from '~core/orm/models';
import { TrackingComponent } from '~utils';

@Component({
	selector: 'image-reviewer-app',
	templateUrl: './image-reviewer.component.html',
	styleUrls: ['./image-reviewer.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageReviewerComponent extends TrackingComponent implements OnInit {

	@Input() images: Array<AppImage> = [];
	@Input() selection = new Map<string, AppImage>();
	@Input() size = 120;
	@Output() imageClick = new EventEmitter<number>();
	@Output() selected = new EventEmitter<AppImage>();
	@Output() unselected = new EventEmitter<AppImage>();

	constructor() { super(); }

	ngOnInit() {
	}

	getStyle() {
		const size = `${this.size}px`;
		return {
			width: size,
			height: size
		};
	}

	onSelect(image: AppImage) {
		this.selection.set(image.id, image);
		this.selected.emit(image);
	}

	onUnselect(image: AppImage) {
		this.selection.delete(image.id);
		this.unselected.emit(image);
	}

}
