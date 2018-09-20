import { Price } from '~models/price.model';
import { uuid } from '~utils/uuid.utils';

export class PriceMatrix {
	id?: string = uuid();
	rows: PriceMatrixRow[] = [];
	__typename ?= 'PriceMatrix';

}

export class PriceMatrixRow {
	id: string = uuid();
	label;
	price: Price = new Price({ value: 0 });
}
