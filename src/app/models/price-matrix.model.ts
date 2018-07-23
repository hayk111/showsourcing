import { Price } from '~models/price.model';
import { uuid } from '~utils/uuid.utils';

export class PriceMatrix {
	id?: string = uuid();
	rows: PriceMatrixRow[] = [];
}

export class PriceMatrixRow {
	id: string = uuid();
	label = 'label';
	price: Price = new Price({ value: 0 });
}
