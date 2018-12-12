import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
	selector: 'app-product-card-library-page',
	templateUrl: './product-card-library-page.component.html',
	styleUrls: ['./product-card-library-page.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardLibraryPageComponent implements OnInit {

	// tslint:disable-next-line:max-line-length
	product = { 'id': 'a097fe3d-6f84-4918-89e2-7a090728207c', 'name': ' EW -0004-GVDE', 'description': '', 'creationDate': 'Thu Jul 12 2018 08:36:54 GMT+0000 (Coordinated Universal Time)', 'favorite': null, 'score': null, 'minimumOrderQuantity': 0, 'lastUpdatedDate': 'Wed Dec 12 2018 16:10:20 GMT+0000 (Coordinated Universal Time)', 'deleted': false, 'archived': false, 'comments': [], 'createdBy': { 'id': '6c0b95d4-5e77-4caa-b826-b471e700d1d7', 'firstName': 'Antoine', 'lastName': 'Praet', 'avatar': { 'id': '36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4', 'urls': [{ 'url': 'https://files.showsourcing.com/xs/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }, { 'url': 'https://files.showsourcing.com/s/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }, { 'url': 'https://files.showsourcing.com/m/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }, { 'url': 'https://files.showsourcing.com/xm/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }, { 'url': 'https://files.showsourcing.com/l/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }, { 'url': 'https://files.showsourcing.com/xl/36a7fadd-4de7-4c5b-b7b4-01a9c5291cf4.jpg', '__typename': 'ImageUrl' }], '__typename': 'Image' }, '__typename': 'User' }, 'images': [{ 'id': '83641ec7-80b9-4650-a80e-0dbf5d71a162', 'orientation': 0, 'imageType': 'Photo', 'urls': [{ 'id': 'https://files.showsourcing.com/xs/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/xs/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }, { 'id': 'https://files.showsourcing.com/s/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/s/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }, { 'id': 'https://files.showsourcing.com/m/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/m/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }, { 'id': 'https://files.showsourcing.com/xm/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/xm/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }, { 'id': 'https://files.showsourcing.com/l/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/l/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }, { 'id': 'https://files.showsourcing.com/xl/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', 'url': 'https://files.showsourcing.com/xl/83641ec7-80b9-4650-a80e-0dbf5d71a162.jpg', '__typename': 'ImageUrl' }], '__typename': 'Image' }], 'supplier': { 'id': 'b6403be0-be5f-4fe3-bc70-29b18bff872b', 'name': ' Ew shelter tent', 'address': null, 'country': null, 'favorite': false, 'officeEmail': null, 'logoImage': null, 'categories': [], 'images': [], '__typename': 'Supplier' }, 'category': { 'id': '0ebeb044-d306-49a8-a7e9-8b0f0b5baf18', 'name': 'chairs', '__typename': 'Category' }, 'price': { 'id': '0ba4f3b9-e975-4429-a317-f4d114583cc6', 'currency': 'USD', 'value': 0, '__typename': 'Price' }, 'status': { 'id': '885c984c-4778-49c4-aaf9-2c2eba31c6fd', 'name': '_TeamReview', 'category': 'inProgress', 'step': 3, 'inWorkflow': true, '__typename': 'ProductStatus' }, 'votes': [], 'projects': [{ 'id': 'a2e40a35-8ee8-4623-8009-59d2ad8a45b3', 'name': 'spring 2019', 'description': null, '__typename': 'Project' }, { 'id': '84f7ba32-a06c-4210-8607-a2d8901a8193', 'name': 'PROJET BUG', 'description': null, '__typename': 'Project' }, { 'id': '7c4f007d-c671-47b4-bb33-e0a9732732d5', 'name': 'Rom', 'description': null, '__typename': 'Project' }, { 'id': 'f2b420cc-f91d-43d0-8444-2b2a7585506f', 'name': 'Winter 2017', 'description': null, '__typename': 'Project' }, { 'id': 'a917212c-8177-4113-9959-8ad9f0a8198f', 'name': 'Reparation', 'description': null, '__typename': 'Project' }, { 'id': 'cadf1ce3-558a-45c3-9344-76e0f9d68b44', 'name': 'Retail france', 'description': null, '__typename': 'Project' }, { 'id': '2b8d1043-bbb4-4256-bddb-437ad3af43ca', 'name': 'Other', 'description': null, '__typename': 'Project' }, { 'id': 'b7f94e61-643e-4abd-81cb-f51343e7b81b', 'name': 'New project', 'description': null, '__typename': 'Project' }, { 'id': 'd6be8c94-cba6-4162-a505-ebd26041e3e1', 'name': 'Pen Candidates', 'description': null, '__typename': 'Project' }, { 'id': '98168758-ac50-4b03-8c4a-02aa2b59a0c9', 'name': 'Prol', 'description': null, '__typename': 'Project' }, { 'id': '37a6bda7-c557-4d52-9863-b755042be90f', 'name': 'PROJECT #1234', 'description': null, '__typename': 'Project' }, { 'id': '0762e079-350b-4ea2-a2f0-4f6b662f16e7', 'name': 'nouveau projet', 'description': null, '__typename': 'Project' }], 'tags': [], '__typename': 'Product' };

	constructor() { }

	ngOnInit() {
	}

}
