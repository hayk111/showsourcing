import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DraggableDirective } from '~shared/dnd/components/draggable/draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DroppableService } from '~shared/dnd/services/droppable.service';

interface Position {
	x: number;
	y: number;
}

/**
 * The directive relying on drag'n drop events (dragStart, dragMove, dragEnd) and handling element moving.
 * Most of the time this directive is used for elements to drag.
 */

@Directive({
	selector: '[movableApp]'
})
export class MovableDirective extends DraggableDirective {
	@HostBinding('style.transform') get transform(): SafeStyle {
		return this.sanitizer.bypassSecurityTrustStyle(
			`translateX(${this.position.x}px) translateY(${this.position.y}px)`
		);
	}

	@HostBinding('class.movable') movable = true;

	/** The current position of the element involved in drag'n drop */
	position: Position = {x: 0, y: 0};

	/** The start position of the element */
	private startPosition: Position;

	/** The data associated with the element */
	@Input('movableApp') data: any;
	/** If the element position must be on dragEnd event */
	@Input('appMovableReset') reset = false;

	constructor(private sanitizer: DomSanitizer, public element: ElementRef,
							private droppableService: DroppableService) {
		super();
	}

	@HostListener('dragStart', ['$event'])
	onDragStart(event: PointerEvent) {
		this.startPosition = {
			x: event.clientX - this.position.x,
			y: event.clientY - this.position.y
		};
		this.droppableService.onDragStart(event, this.data);
	}

	@HostListener('dragMove', ['$event'])
	onDragMove(event: PointerEvent) {
		this.position.x = event.clientX - this.startPosition.x;
		this.position.y = event.clientY - this.startPosition.y;
		this.droppableService.onDragMove(event);
	}

	@HostListener('dragEnd', ['$event'])
	onDragEnd(event: PointerEvent) {
		if (this.reset) {
			this.position = {x: 0, y: 0};
		}
		this.droppableService.onDragEnd(event, this.data);
	}
}
