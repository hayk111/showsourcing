import { Component, AfterViewInit, ChangeDetectionStrategy, Input, ElementRef, Renderer2 } from '@angular/core';
import { AnimatedStackService } from '~shared/animated-stack/services/animated-stack.service';
import { of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Component({
	selector: 'animated-card-app',
	templateUrl: './animated-card.component.html',
	styleUrls: ['./animated-card.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnimatedCardComponent implements AfterViewInit {
	/** index of the item in the list */
	@Input() index: number;
	delay = 1000;

	constructor(
		private stackSrv: AnimatedStackService,
		private elemRef: ElementRef,
		private renderer: Renderer2
	) { }

	ngAfterViewInit() {
		this.renderer.setStyle(this.elemRef.nativeElement, 'transition', `${this.delay}ms transform`);
	}

	destroy() {
		this.renderer.setStyle(this.elemRef.nativeElement, 'visibility', 'hidden');
		this.stackSrv.destroy(this.index);
		return of(true).pipe(
			// after the anim is over
			delay(this.delay),
			tap(_ => this.renderer.setStyle(this.elemRef.nativeElement, 'display', 'none'))
		);
	}


}
