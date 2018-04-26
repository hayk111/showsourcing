import { Currency } from '../currency';
import { Entity } from '~app/entity/store/entity.model';

export enum ProductStatus {
	IDEA = 'Idea',
	UNDER_ASSESSMENT = 'Under Assessment',
	NEED_REVIEW = 'Need Review',
	COMPLETE = 'Complete',
	REFUSED = 'Refused',
}

export class Product extends Entity {
	priceAmount: number;
	priceCurrency: Currency;
	price: any;
	minimumOrderQuantity: number;
	supplierId: string;
	categoryId: string;
	teamId: string;
	additionalInfo: any;
	status: ProductStatus;
	computedValues: { taskCount: number; score: number; commentCount: number };
	description: string;
	eventId: string;
	rating: number;
	projectIds: Array<string>;
	tagIds: Array<string>;
	imageCount: number;
	mainImage: {
		id: string;
		filename: string;
		imageType: string;
		creationDate: number;
		createdByUserId: string;
		orientation: number;
		urls: {
			url_60x45: string;
			url_120x90: string;
			url_220x165: string;
			url_400x300: string;
			url_600x450: string;
			url_1000x1000: string;
		};
	};
	constructor(public name: string, userId: string) {
		super(userId);
	}
}
