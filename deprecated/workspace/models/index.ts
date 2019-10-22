import { Product } from '~models';

export interface Category {
	key: string;
	values: Product[];
	label: any;
	checked: boolean;
}
