import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class DroppableService {
	dragStart$: Observable<PointerEvent>;
	dragMove$: Observable<PointerEvent>;
  dragEnd$: Observable<PointerEvent>;
  
  currentDataDragged: any;

	private dragStartSubject = new Subject<PointerEvent>();
	private dragMoveSubject = new Subject<PointerEvent>();
  private dragEndSubject = new Subject<PointerEvent>();
  
	constructor(@SkipSelf() @Optional() private parent?: DroppableService) {
		this.dragStart$ = this.dragStartSubject.asObservable();
		this.dragMove$ = this.dragMoveSubject.asObservable();
    this.dragEnd$ = this.dragEndSubject.asObservable();
    
	}

	onDragStart(event: PointerEvent, data: any): void {
    this.dragStartSubject.next(event);
    this.currentDataDragged = data;

		if (this.parent) {
			this.parent.onDragStart(event, data);
		}
	}

	onDragMove(event: PointerEvent): void {
    // console.log('>> service onDragMove');
		this.dragMoveSubject.next(event);

		if (this.parent) {
			this.parent.onDragMove(event);
		}
	}

	onDragEnd(event: PointerEvent, data: any): void {
    this.dragEndSubject.next(event);
    this.currentDataDragged = data;

		if (this.parent) {
			this.parent.onDragEnd(event, data);
		}
	}
}
