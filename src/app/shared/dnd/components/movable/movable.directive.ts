import { Directive, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { DraggableDirective } from '../draggable/draggable.directive';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';
import { DroppableService } from '../../services/droppable.service';

interface Position {
	x: number;
	y: number;
}

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

	position: Position = {x: 0, y: 0};

	private startPosition: Position;

  @Input('movableApp') data: any;
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
