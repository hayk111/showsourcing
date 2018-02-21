import { Counters } from '../../store/model/entities/counters.interface';
import { Category } from '../../store/model/entities/category.model';
import { Currency } from '../../store/model/entities/currency.model';
import { AppImage } from '../../store/model/entities/app-image.model';
import { Tag } from '../../store/model/entities/tag.model';
import { AppFile } from '../../store/model/entities/app-file.model';
import { Project } from '../../store/model/entities/project.model';

export enum ProductStatus {
	IDEA = 'Idea',
	UNDER_ASSESSMENT = 'Under Assessment',
	NEED_REVIEW = 'Need Review',
	COMPLETE = 'Complete',
	REFUSED = 'Refused'
}

export interface Product {
	id: string;
	name: string;
	priceAmount: number;
	priceCurrency: Currency;
	price: any;
	minimumOrderQuantity: number;
	supplierId: string;
	categoryId: string;
	teamId: string;
	creationDate: number;
	lastModifiedDate: number;
	createdByUserId: string;
	lastUpdatedByUserId: string;
	counters: Counters;
	additionalInfo: any;
	additionalInfoCounters: any;
	status: ProductStatus;
	flags: { archived: boolean, feedbackRequested: boolean, locked: boolean };
	computedValues: { taskCount: number, score: number, commentCount: number };
	description: string;
	eventId: string;
	rating: number;
	category: Category;
	tags: Array<Tag>;
	projects: Array<Project>;
	images: Array<AppImage>;
	files: Array<AppFile>;
	mainImage: {
		id: string,
		filename: string,
		imageType: string,
		creationDate: number,
		createdByUserId: string,
		orientation: number,
		urls: {
			url_60x45: string,
			url_120x90: string,
			url_220x165: string,
			url_400x300: string,
			url_600x450: string,
			url_1000x1000: string,
		};
	};
}
