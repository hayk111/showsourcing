import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-test-carousel',
	templateUrl: './test-carousel.component.html',
	styleUrls: ['./test-carousel.component.scss']
})
export class TestCarouselComponent implements OnInit {
	firstCarouselOpen = false;
	images = [
		'https://www.planwallpaper.com/static/images/canberra_hero_image_JiMVvYU.jpg',
		'https://www.thesun.co.uk/wp-content/uploads/2017/04/nintchdbpict000319835741.jpg',
		'https://www.planwallpaper.com/static/images/foggygoldengatebridge.jpg'
	];

	constructor() { }

	ngOnInit() {
	}

	openFirstCarousel() {
		this.firstCarouselOpen = true;
	}

	closeFirstCarousel() {
		this.firstCarouselOpen = false;
	}
}
