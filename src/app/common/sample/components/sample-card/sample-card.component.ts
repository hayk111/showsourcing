import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	EventEmitter,
	Input,
	OnInit,
	Output,
	Renderer2,
} from '@angular/core';
import { Sample } from '~core/models';
import { TrackingComponent } from '~utils/tracking-component';

@Component({
	selector: 'sample-card-app',
	templateUrl: './sample-card.component.html',
	styleUrls: ['./sample-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SampleCardComponent extends TrackingComponent implements OnInit, AfterViewInit {

	/** whether is checked or not */
	@Input() checked: boolean;
	/** the associated sample */
	@Input() set sample(sample: Sample) {
		this._sample = sample;
	}
	get sample() {
		return this._sample;
	}
	/** Trigger the event when the element is selected via the checkbox */
	@Output() select = new EventEmitter<any>();
	/** Trigger the event when the element is unselected via the checkbox */
	@Output() unselect = new EventEmitter<any>();
	@Output() previewClick = new EventEmitter<Sample>();

	/** An interaction (check or unckeck) occurred on the checkbox */
	checkboxAction = false;
	hovered = false;
	private _sample: Sample;

	constructor(
		private elementRef: ElementRef,
		private renderer: Renderer2
	) { super(); }

	ngOnInit() {
	}

	ngAfterViewInit() {
		if (this.checked) {
			this.renderer.addClass(this.elementRef.nativeElement, 'highlight-checked');
		}
	}

	/** Toggle checked */
	toggleChecked() {
		if (this.checked) {
			this.onUnchecked();
		} else {
			this.onChecked();
		}
	}

	/** Handle checbkox check event */
	onChecked() {
		this.checked = true;
		this.checkboxAction = true;
		this.select.emit(this.sample);
		if (this.checked) {
			this.renderer.addClass(this.elementRef.nativeElement, 'highlight-checked');
		}
	}

	/** Handle checbkox uncheck event */
	onUnchecked() {
		this.checked = false;
		this.checkboxAction = true;
		this.unselect.emit(this.sample);
		if (!this.checked) {
			this.renderer.removeClass(this.elementRef.nativeElement, 'highlight-checked');
		}
	}

}
