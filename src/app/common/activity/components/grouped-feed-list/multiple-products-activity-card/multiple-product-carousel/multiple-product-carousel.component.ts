import {
		ChangeDetectionStrategy,
		Component, EventEmitter, Input, OnInit, Output, ViewChild, ElementRef, AfterContentChecked, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { map, take} from 'rxjs/operators';
import { Product } from '~core/erm';

@Component({
	selector: 'multiple-product-carousel-app',
	templateUrl: './multiple-product-carousel.component.html',
	styleUrls: ['./multiple-product-carousel.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultipleProductCarouselComponent implements OnInit {

	@Input() products: Product[];
	@Input() selectedIndex = 0;
	@Input() hasLeftMargin = false;
	@Output() update = new EventEmitter<Product>();
	@Output() previewClick = new EventEmitter<Product>();
	@Output() open = new EventEmitter<Product>();
	@Output() liked = new EventEmitter<Product>();
	@Output() disliked = new EventEmitter<Product>();

	@ViewChild('cardSection', { static: false }) cardSection: ElementRef;

	showArrows = false;

	constructor(private router: Router) { }

	ngOnInit() {
	}

	updateProduct(prod: Product, fields) {
		this.update.emit({ id: prod.id, ...fields });
	}

	back(event) {
		event.stopPropagation();
		this.animateScroll(false);
	}

	next(event) {
		event.stopPropagation();
		this.animateScroll();
	}

	openProduct(id: string) {
		this.router.navigate(['products', id]);
	}

	// adds horizontal scroll animation to the component's grid section
	animateScroll(forth = true, size = 150) {
		this.cardSection.nativeElement.scrollTo({
			left: (this.cardSection.nativeElement.scrollLeft + (forth ? size : -size)),
			behavior: 'smooth'
		});
	}
}
