import { Component, OnInit, ChangeDetectionStrategy, ContentChildren, AfterViewInit, QueryList, ElementRef } from '@angular/core';
import { AnimatedCardComponent } from '~shared/animated-stack/components/animated-card/animated-card.component';
import { AnimatedStackService } from '~shared/animated-stack/services/animated-stack.service';
import { first } from 'rxjs/operators';

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

	constructor(private stackSrv: AnimatedStackService) { }

	ngAfterViewInit() {
		this.cards.forEach(card => {
			const coords = card.nativeElement.getBoundingClientRect();
			this.coordinates.push(coords);
		});
		// when a card has been destroyed we get its index
		this.stackSrv.destroyed$.subscribe(index => {
			for (let i = index; i < this.cards.length; i++) {
				const lastCoords = this.coordinates[index];
				this.cards[i].nativeElement.getBoundingClientRect();
			}
		});
	}

	applyTranslation() {

	}

}

