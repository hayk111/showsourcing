import {
	Directive, ElementRef, EventEmitter,
	HostBinding, HostListener, OnInit,
	Output, SkipSelf, Input } from '@angular/core';
import { DroppableService } from '~shared/dnd/services/droppable.service';

/** The directive to use to define a dropzone within drag'n drop */

@Directive({
	selector: '[dropzoneApp]',
	providers: [DroppableService]
})
export class DropzoneDirective implements OnInit {
	@HostBinding('class.dropzone-activated') activated = false;
	@HostBinding('class.dropzone-entered') entered = false;

	/** The value associated with the dropzone */
	@Input('dropzoneApp') value: any;
	@Input() disabled: any;
	@Input() data: any;
	/** The event when an element is dropped into the zone */
	@Output() itemDropped = new EventEmitter<{ target: any, droppedElement: any }>();
	/** The event when an element enters into the zone during drag'n drop */
	@Output() itemEntered = new EventEmitter<null>();
	/** The event when an element leaves into the zone during drag'n drop */
	@Output() itemLeft = new EventEmitter<null>();

	private clientRect: ClientRect;

	constructor(@SkipSelf() private allDroppableService: DroppableService,
							private innerDroppableService: DroppableService,
							private element: ElementRef) { }

	ngOnInit() {
		// Droppable service specific shared by all dropzones
		this.allDroppableService.dragStart$.subscribe(() => this.onDragStart());
		this.allDroppableService.dragEnd$.subscribe(event => this.onDragEnd(event));

		this.allDroppableService.dragMove$.subscribe(event => {
			if (this.isEventInside(event)) {
				this.onPointerEnter();
			} else {
				this.onPointerLeave();
			}
		});

		// Droppable service specific to the dropzone
		this.innerDroppableService.dragStart$.subscribe(() => this.onInnerDragStart());
		this.innerDroppableService.dragEnd$.subscribe(event => this.onInnerDragEnd(event));
	}

	/** The dragged element enters the dropzone */
	private onPointerEnter(): void {
		if (!this.activated || this.disabled) {
			return;
		}

		this.itemEntered.emit();
		this.entered = true;
	}

	/** The dragged element leaves the dropzone */
	private onPointerLeave(): void {
		if (!this.activated || this.disabled) {
			return;
		}

		this.itemLeft.emit();
		this.entered = false;
	}

	/** The drag'n drop starts */
	private onDragStart(): void {
		this.clientRect = this.element.nativeElement.getBoundingClientRect();

		if (!this.disabled) {
			this.activated = true;
		}
	}

	/** The drag'n drop ends */
	private onDragEnd(event): void {
		if (!this.activated || this.disabled) {
			return;
		}

		if (this.entered) {
			this.itemDropped.emit({ target: this.value, droppedElement: this.allDroppableService.currentDataDragged });
		}

		this.activated = false;
		this.entered = false;
	}

	/** The drag'n drop starts (interception at dropzone level) */
	private onInnerDragStart() {
		this.activated = true;
		this.entered = true;
	}

	/** The drag'n drop ends (interception at dropzone level) */
	private onInnerDragEnd(event: PointerEvent) {
		if (!this.entered) {
			// this.remove.emit(event);
		}

		this.activated = false;
		this.entered = false;
	}

	/** Checks if the element is within the dropzone */
	private isEventInside(event: PointerEvent) {
		return event.clientX >= this.clientRect.left &&
			event.clientX <= this.clientRect.right &&
			event.clientY >= this.clientRect.top &&
			event.clientY <= this.clientRect.bottom;
	}
}
