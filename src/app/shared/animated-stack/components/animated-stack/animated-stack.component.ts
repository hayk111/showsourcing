import {
	AfterViewInit,
	ChangeDetectionStrategy,
	Component,
	ContentChildren,
	ElementRef,
	QueryList,
	Renderer2,
} from '@angular/core';
import { AnimatedCardComponent } from '~shared/animated-stack/components/animated-card/animated-card.component';
import { AnimatedStackService } from '~shared/animated-stack/services/animated-stack.service';

@Component({
	selector: 'animated-stack-app',
	templateUrl: './animated-stack.component.html',
	styleUrls: ['./animated-stack.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	providers: [AnimatedStackService]
})
export class AnimatedStackComponent implements AfterViewInit {
	@ContentChildren(AnimatedCardComponent, { read: ElementRef }) cards: QueryList<ElementRef<HTMLElement>>;
	coordinates = [

	];

	constructor(
		private stackSrv: AnimatedStackService,
		private renderer: Renderer2,
		private elemRef: ElementRef
	) { }

	ngAfterViewInit() {
		// when a card has been destroyed we get its index
		this.stackSrv.destroyed$.subscribe(index => {
			const cardArray = this.cards.map(card => card);
			for (let i = index + 1; i < cardArray.length; i++) {
				// we now need to modify next card
				const cardElem = cardArray[i].nativeElement;
				const lastCoords = cardArray[i - 1].nativeElement.getBoundingClientRect();
				const currentCoords = cardElem.getBoundingClientRect();
				this.applyTranslation(cardElem, lastCoords, currentCoords);
			}
		});
		// we need to reset the translation after changes
		this.cards.changes
			.subscribe(cards => cards.forEach(card => {
				const elem = card.nativeElement;
				// this.renderer.setStyle(elem, 'transform', 'none');
				// this.renderer.setStyle(elem, 'transition', 'none');

			}));
	}

	applyTranslation(elem, lastCoords, currentCoords) {
		const dx = lastCoords.x - currentCoords.x;
		const dy = lastCoords.y - currentCoords.y;
		this.renderer.setStyle(elem, 'transition', '300ms transform');
		this.renderer.setStyle(elem, 'transform', `translate3d(${dx}px, ${dy}px, 0)`);
	}

}

