
export class ProductStatusType {
	id: string;
	name?: string;
	inWorkflow?: boolean;
	category?: string;
	step?: number;
	__typename ?= 'ProductStatusType';
}
