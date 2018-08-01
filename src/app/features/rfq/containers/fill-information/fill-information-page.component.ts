import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDescriptor, CustomField } from '~shared/dynamic-forms';


@Component({
	selector: 'rfq-fill-information-page-app',
	templateUrl: './fill-information-page.component.html',
	styleUrls: ['./fill-information-page.component.scss'],
})
export class FillInformationPageComponent {

	descriptor$: Observable<FormDescriptor>;
	descriptor2$: Observable<FormDescriptor>;

	customFields: CustomField[] = [
		{ name: 'supplier', type: 'selector', metadata: { target: 'supplier', type: 'entity', labelName: 'name', canCreate: true } },
		{
			name: 'category', type: 'selector',
			metadata: { target: 'category', type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'name', type: 'text', required: true, label: 'name' },
		{ name: 'price', type: 'price' },
		{ name: 'createdBy', type: 'selector', metadata: { target: 'user', type: 'entity', labelName: 'name' } },
		{
			name: 'createdBy', label: 'Assignee', type: 'selector',
			metadata: { target: 'user', type: 'entity', labelName: 'name' }
		},
		{ name: 'minimumOrderQuantity', type: 'number', label: 'MOQ' },
		{ name: 'moqDescription', type: 'text', label: 'MOQ description' },
		{
			name: 'event', label: 'Found at', type: 'selector',
			metadata: { target: 'event', type: 'entity', labelName: 'name', canCreate: true }
		},
		{ name: 'tags', type: 'selector', metadata: { target: 'tag', type: 'entity', labelName: 'name', canCreate: true }, multiple: true },
		{ name: 'description', type: 'textarea', label: 'description' },

	];
	// those are the custom field for the second form section
	customFields2: CustomField[] = [
		{ name: 'innerCarton', type: 'packaging', label: 'inner carton' },
		{ name: 'masterCarton', type: 'packaging', label: 'master carton' },
		// { name: 'samplePrice', type: 'number', label: 'Sample Price' },
		{ name: 'priceMatrix', type: 'priceMatrix', label: 'price matrix' },
		{ name: 'sample', type: 'yesNo' },
		{ name: 'samplePrice', type: 'number', label: 'Sample Price' },
	];

	product = {
		"id": "ac0eee6c-02a1-474d-9bf6-585b06c6cd5b",
		"name": "VEDE-0001-AP",
		"supplier": {
			"id": "71144d98-2d05-44db-86c4-35d2d50b0784",
			"name": "Supp 10052",
			"address": null,
			"country": null,
			"logoImage": null,
			"__typename": "Supplier"
		},
		"images": [
			{
				"id": "27bb4e6a-4830-4f6b-90fc-b6c77cabb953",
				"fileName": "27bb4e6a-4830-4f6b-90fc-b6c77cabb953.jpg",
				"orientation": 0,
				"__typename": "Image"
			},
			{
				"id": "3d95dbe5-7016-435c-9035-af4a1361b5be",
				"fileName": "3d95dbe5-7016-435c-9035-af4a1361b5be.jpg",
				"orientation": 0,
				"__typename": "Image"
			},
			{
				"id": "3d95dbe5-7016-435c-9035-af4a1361b5be",
				"fileName": "3d95dbe5-7016-435c-9035-af4a1361b5be.jpg",
				"orientation": 0,
				"__typename": "Image"
			},
			{
				"id": "98dfaab1-e4df-41b0-ab7b-a857acdd0986",
				"fileName": "98dfaab1-e4df-41b0-ab7b-a857acdd0986.jpg",
				"orientation": 0,
				"__typename": "Image"
			},
			{
				"id": "84554ab8-59a4-4a61-b39d-46deb5516a4a",
				"fileName": "84554ab8-59a4-4a61-b39d-46deb5516a4a.jpg",
				"orientation": 0,
				"__typename": "Image"
			}
		],
		"price": {
			"id": "0cd4b498-c950-4bf2-87f1-05aa56f51003",
			"currency": "USD",
			"value": 0,
			"baseCurrencyValue": null,
			"__typename": "Price"
		},
		"category": {
			"id": "2068d6fc-d4c3-42fd-9766-9475a0226067",
			"name": "post it",
			"__typename": "Category"
		},
		"projects": [
			{
				"id": "e0fe18e9-db2a-4333-a016-46f40fd02a61",
				"name": "aaa",
				"productCount": 0,
				"__typename": "Project"
			},
			{
				"id": "f2005fed-93c6-4890-b5af-87be7a23db67",
				"name": "autre",
				"productCount": 0,
				"__typename": "Project"
			}
		],
		"description": "Quick a good product I got to say\nExist in 4 colors: Blue / Red / Green / White",
		"event": {
			"id": "4c59dadd-03a0-4dfd-9be5-a10477a1676d",
			"name": "fgh",
			"description": {
				"id": "4c59dadd-03a0-4dfd-9be5-a10477a1676d",
				"logoImage": null,
				"__typename": "EventDescription"
			},
			"__typename": "Event"
		},
		"favorite": true,
		"statuses": [
			{
				"id": "a18ba2b6-33a8-486f-af40-ef5ada20e64d",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "6d37b4bf-a527-42cf-9fff-92bb18df0000",
				"cancelled": false,
				"status": {
					"id": "16fa6474-628e-4db5-b0b7-ea34e732f7ba",
					"name": "Complete",
					"color": "validated",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "4d5ecc82-63cd-46ea-8dd2-a00456ac20a6",
				"cancelled": false,
				"status": {
					"id": "21e5b9b5-3e6c-4af3-b087-66f744bc93e7",
					"name": "Refused",
					"color": "rejected",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "bac4d350-9534-4913-82d4-d096ba75a188",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "35c4169a-d68d-4e73-b825-814ba8f7f8bd",
				"cancelled": false,
				"status": {
					"id": "16fa6474-628e-4db5-b0b7-ea34e732f7ba",
					"name": "Complete",
					"color": "validated",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "5ff9b1ab-5fb4-47a6-9d67-d66ddb535de1",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "0adbe554-0fdc-4aba-9540-dae8f9244233",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "50d0bc71-c41c-4612-aaca-f6a51448ffff",
				"cancelled": false,
				"status": {
					"id": "21e5b9b5-3e6c-4af3-b087-66f744bc93e7",
					"name": "Refused",
					"color": "rejected",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "fe8e44ff-b2db-49df-a1f9-5d0cca9d44a4",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "9e28eeac-76d5-432c-b26e-5ae30e05445b",
				"cancelled": false,
				"status": {
					"id": "a83edd61-dff5-4625-b37a-56aa65078419",
					"name": "Inspiration",
					"color": "inspiration",
					"contrastColor": "dark",
					"step": 0,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "a2243d9e-1d7c-4f3f-ad70-59a380952a70",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "1be0aa7e-6bab-462c-a1c5-bb24039e7af8",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "5dcf8ea1-4586-4007-b3bb-b19d458bcc12",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "02e53fd6-aa6f-4ef4-a183-ef6a634ff7a2",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "0f5c371e-d508-4efe-a2f9-280920b4a7c8",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "9f6a276a-416a-4ee6-b75a-52c0718e6c98",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "691751d3-4b72-441c-8645-71ee2d384dd9",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "d9d323df-a14c-4619-a8eb-0e449080fbc8",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "c8d743ae-036d-4cce-ad98-bc36a96572ce",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "cba83431-3f06-4f72-b24b-f9fc13e26ce6",
				"cancelled": false,
				"status": {
					"id": "16fa6474-628e-4db5-b0b7-ea34e732f7ba",
					"name": "Complete",
					"color": "validated",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "d6420f0b-a850-429f-95b1-b1aefde3ebe3",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "44a064da-401f-48e0-819f-6232ba407223",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "35cc6cc3-16a7-4d61-a194-db01f634ce1e",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "e181601c-6bd2-46d7-91f0-21df5f0c997c",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "32178bfe-2253-4f3d-99f7-d2eeaafd5363",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "8904e0d5-7651-4375-99e9-7dce890f6629",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "87cd3c57-2f9e-493e-9722-d421da73c779",
				"cancelled": false,
				"status": {
					"id": "5d72acff-ad3b-448e-9e32-9e92445d70ee",
					"name": "UnderAssessment",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "4dcb5e4d-93a1-465d-b7c0-a2b7c5864df2",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "62b1f0b7-ad31-4f49-a4a6-1a9804a3ec8d",
				"cancelled": false,
				"status": {
					"id": "21e5b9b5-3e6c-4af3-b087-66f744bc93e7",
					"name": "Refused",
					"color": "rejected",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "6507a102-2fcf-40f6-9e55-1c2ffe7a76c0",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "9c48a929-1e61-4942-a22d-cf2b43b18ff6",
				"cancelled": false,
				"status": {
					"id": "ec5620fb-ec33-44c7-bbe6-3f034a28426c",
					"name": "NeedReview",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			},
			{
				"id": "f48eead7-c021-4615-a055-88cd73e5b728",
				"cancelled": false,
				"status": {
					"id": "663530b2-70fd-4fad-8dd4-40488e71df79",
					"name": "Idea",
					"color": "inProgress",
					"contrastColor": "light",
					"step": null,
					"__typename": "ProductStatusType"
				},
				"__typename": "ProductStatus"
			}
		],
		"tags": [
			{
				"id": "eef7d323-3635-46a8-9842-dd024794d317",
				"name": "123456",
				"__typename": "Tag"
			},
			{
				"id": "2717c451-d52f-4e42-8669-4f33192bfb3a",
				"name": "Ccc",
				"__typename": "Tag"
			},
			{
				"id": "8348c3ac-02a4-4e63-9e37-11ac4907087d",
				"name": "Hrthf",
				"__typename": "Tag"
			}
		],
		"minimumOrderQuantity": 240,
		"moqDescription": "Per Color",
		"score": null,
		"votes": [
			{
				"id": "6a5fb0f7-ef6c-40cc-be30-19f138edb421",
				"value": 100,
				"user": {
					"id": "6c0b95d4-5e77-4caa-b826-b471e700d1d7",
					"__typename": "User"
				},
				"__typename": "ProductVote"
			}
		],
		"innerCarton": {
			"id": "ef3b2134-0b7d-4032-9df5-29d70f68bf6d",
			"height": 233,
			"width": 123123,
			"length": 23,
			"unit": "cm",
			"itemsQuantity": 0,
			"weight": 0,
			"weightUnit": "",
			"__typename": "Packaging"
		},
		"masterCarton": null,
		"priceMatrix": {
			"id": "5f858d12-2421-4560-aca8-cdf912ab9dbf",
			"rows": [
				{
					"id": "d21c6341-b20e-4b37-945b-2a7a45c56a45",
					"label": "",
					"price": {
						"id": "20122d9a-21bf-4c6d-b54f-6c68e26a15eb",
						"value": 0,
						"currency": "USD",
						"__typename": "Price"
					},
					"__typename": "PriceMatrixRow"
				},
				{
					"id": "6465df3a-b4f9-4593-bc7e-c9f09fe69a1f",
					"label": "",
					"price": {
						"id": "d7af5d45-8d38-448e-a949-dff10aa61778",
						"value": 0,
						"currency": "USD",
						"__typename": "Price"
					},
					"__typename": "PriceMatrixRow"
				},
				{
					"id": "122b8348-c490-4127-9dcd-ff7e2f11e182",
					"label": "",
					"price": {
						"id": "df667985-b51e-43c0-bac0-0ba09855f9a5",
						"value": 0,
						"currency": "USD",
						"__typename": "Price"
					},
					"__typename": "PriceMatrixRow"
				},
				{
					"id": "8ed87eb5-3468-4cd0-a5e8-fa6d6a55a6b5",
					"label": "",
					"price": {
						"id": "4f30af0c-01ff-45b0-b6d6-6806960dc929",
						"value": 0,
						"currency": "USD",
						"__typename": "Price"
					},
					"__typename": "PriceMatrixRow"
				}
			],
			"__typename": "PriceMatrix"
		},
		"leadTimeValue": 0,
		"leadTimeUnit": null,
		"sample": true,
		"samplePrice": 0,
		"createdBy": {
			"id": "27ec5a84-1ec5-453f-8cf5-b58f0344ff67",
			"firstName": "gauthier",
			"lastName": "van den Eynde",
			"__typename": "User"
		},
		"creationDate": "Sun Jan 18 1970 04:25:53 GMT+0000 (UTC)",
		"__typename": "Product"
	};

	ngOnInit() {
		this.descriptor$ = of(this.product).pipe(
			map(product => new FormDescriptor(this.customFields, product))
		);
		this.descriptor2$ = of(this.product).pipe(
			map(product => new FormDescriptor(this.customFields2, product))
		);
	}
}
