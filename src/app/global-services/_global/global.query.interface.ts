
export interface GlobalQuery {
	one: (str?: string) => any;
	many: (str?: string) => any;
	list?: (str?: string) => any;
	create: (str?: string) => any;
	update: (str?: string) => any;
	deleteOne: any;
	deleteMany: any;
	all: (str?: string) => any;
	allIds?: any;
}



