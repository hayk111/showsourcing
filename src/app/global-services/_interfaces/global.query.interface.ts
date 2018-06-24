
export interface GlobalQuery {
	one: any;
	list?: any;
	create: any;
	update: any;
	delete: any;
	deleteMany: any;
	all: (str: string) => any;
}



