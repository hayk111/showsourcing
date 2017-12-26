import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-test-carousel',
	templateUrl: './test-carousel.component.html',
	styleUrls: ['./test-carousel.component.scss']
})
export class TestCarouselComponent implements OnInit {
	firstCarouselOpen = false;
	images = imgs;

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

const imgs = [
	{'id': '01300840-f270-49cb-bc00-1a1eb0fc68c2', 
	'fileName': '01300840-f270-49cb-bc00-1a1eb0fc68c2.jpg', 
	'imageType': 'Photo', 
	'creationDate': 1510281053123, 
	'createdByUserId': 'b96d602d-5406-4e5e-8d7c-1490acbc5f2c', 
	'orientation': 3, 
	'urls': {
		'url_60x45': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xs/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg', 
		'url_120x90': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/s/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg', 
		'url_220x165': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/m/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg', 
		'url_400x300': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xm/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg', 
		'url_600x450': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/l/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg', 
		'url_1000x1000': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xl/01300840-f270-49cb-bc00-1a1eb0fc68c2_3.jpg'
	}, 
	'linkedToParent': true, 
	'mainImage': true
},
{
	'id': 'a9c3a7ad-944d-451d-a585-a1c946807177', 
	'fileName': 'a9c3a7ad-944d-451d-a585-a1c946807177.jpg', 
	'imageType': 'Photo', 'creationDate': 1511960188008, 
	'createdByUserId': 'b96d602d-5406-4e5e-8d7c-1490acbc5f2c', 
	'orientation': 0, 
	'urls':
	{
		'url_60x45': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xs/a9c3a7ad-944d-451d-a585-a1c946807177.jpg',
		'url_120x90': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/s/a9c3a7ad-944d-451d-a585-a1c946807177.jpg', 
		'url_220x165': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/m/a9c3a7ad-944d-451d-a585-a1c946807177.jpg', 
		'url_400x300': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xm/a9c3a7ad-944d-451d-a585-a1c946807177.jpg', 
		'url_600x450': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/l/a9c3a7ad-944d-451d-a585-a1c946807177.jpg', 
		'url_1000x1000': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xl/a9c3a7ad-944d-451d-a585-a1c946807177.jpg'
	}, 
	'linkedToParent':true, 
	'mainImage':false
},
{
	'id': '2fbe2165-42e5-486c-b5f8-978d4e6c9f6e', 
	'fileName': '2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
	'imageType': 'Photo', 
	'creationDate': 1511960251500, 
	'createdByUserId': 'b96d602d-5406-4e5e-8d7c-1490acbc5f2c', 
	'orientation': 0, 
	'urls':
	{
		'url_60x45': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xs/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
		'url_120x90': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/s/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
		'url_220x165': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/m/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
		'url_400x300': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xm/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
		'url_600x450': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/l/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg', 
		'url_1000x1000': 'https://showsourcing-test-26.s3-eu-west-1.amazonaws.com/xl/2fbe2165-42e5-486c-b5f8-978d4e6c9f6e.jpg'
	}, 
	'linkedToParent': true, 
	'mainImage': false
};
