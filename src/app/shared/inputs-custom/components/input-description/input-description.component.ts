import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	Output,
	Renderer2,
	ViewChild,
} from '@angular/core';

@Component({
	selector: 'input-description-app',
	templateUrl: './input-description.component.html',
	styleUrls: ['./input-description.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputDescriptionComponent implements AfterViewInit {

	@Input() description = '';
	@Input() hasLabel = false;
	@Input() isBig = false;
	@Output() update = new EventEmitter<string>();

	@ViewChild('container') container: ElementRef<HTMLElement>;

	showMore = false;

	constructor(
		private render: Renderer2,
		private cd: ChangeDetectorRef) { }


	ngAfterViewInit() {
		this.adaptSize();
	}

	updateDescription(isCancel: boolean = true, newDescription: string) {
		if (!isCancel) {
			this.update.emit(newDescription);
		}
		this.adaptSize();
	}

	showAll() {
		this.render.setStyle(this.container.nativeElement, 'height', '100%');
		this.showMore = false;
	}

	adaptSize() {
		if (this.container.nativeElement.clientHeight > 85 && !this.showMore) {
			this.render.setStyle(this.container.nativeElement, 'height', '85px');
			this.showMore = true;
		} else if (this.showMore === true) {
			this.render.setStyle(this.container.nativeElement, 'height', '85px');
		} else {
			this.render.setStyle(this.container.nativeElement, 'height', '100%');
			this.showMore = false;
		}
		this.cd.detectChanges();
	}
}
