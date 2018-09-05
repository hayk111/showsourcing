import {
	Directive, EventEmitter, HostBinding,
	HostListener, OnInit, Output,
	Input
} from '@angular/core';
import { Subject, merge } from 'rxjs';
import { repeat, switchMap, take, takeUntil, mapTo } from 'rxjs/operators';

/** The base directive to emulate drag'n drop events: dragStart, dragMove, dragEnd */

@Directive({
	selector: '[draggableApp]'
})
export class DraggableDirective implements OnInit {
	@HostBinding('class.draggable') draggable = true;
	@HostBinding('class.dragging') dragging = false;

	/** to trigger pointer-events polyfill */
	@HostBinding('attr.touch-action') touchAction = 'none';

	@Input()
	disabled: boolean;

	/** The dragStart event */
	@Output() dragStart = new EventEmitter<PointerEvent>();
	/** The dragMove event */
	@Output() dragMove = new EventEmitter<PointerEvent>();
	/** The dragEnd event */
	@Output() dragEnd = new EventEmitter<PointerEvent>();

	/* The subject to triger on pointer down events */
	private pointerDown = new Subject<PointerEvent>();
	/* The subject to triger on pointer move events */
	private pointerMove = new Subject<PointerEvent>();
	/* The subject to triger on pointer up events */
	private pointerUp = new Subject<PointerEvent>();

	@HostListener('pointerdown', ['$event'])
	onPointerDown(event: PointerEvent): void {
		if (this.disabled) {
			this.pointerDown.next(event);
			event.stopPropagation();
		}
	}

	@HostListener('document:pointermove', ['$event'])
	onPointerMove(event: PointerEvent): void {
		if (this.disabled) {
			this.pointerMove.next(event);
			event.stopPropagation();
		}
	}

	@HostListener('document:pointerup', ['$event'])
	onPointerUp(event: PointerEvent): void {
		if (this.disabled) {
			this.pointerUp.next(event);
			event.stopPropagation();
		}
	}

	ngOnInit(): void {
		// stream of dragStart
		this.pointerDown
			.subscribe(this.dragStart);

		// stream of dragMove
		this.pointerDown.pipe(
			switchMap(() => this.pointerMove),
			takeUntil(this.pointerUp),
			repeat()
		).subscribe(this.dragMove);

		// stream of dragEnd
		this.pointerDown.pipe(
			switchMap(() => this.pointerUp),
			take(1),
			repeat()
		).subscribe(this.dragEnd);

		// dragging true/false
		merge(
			this.dragStart.pipe(mapTo(true)),
			this.dragEnd.pipe(mapTo(false))
		).subscribe(dragging => {
			this.dragging = dragging;
		});
	}
}
