
export interface GlobalQuery {
	one: any;
	many?: any;
	list?: any;
	create: any;
	update: any;
	deleteOne: any;
	deleteMany: any;
	all: (str: string) => any;
}



