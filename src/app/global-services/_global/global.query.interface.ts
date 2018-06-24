
export interface GlobalQuery {
	one: any;
	list?: any;
	create: any;
	update: any;
	deleteOne: any;
	deleteMany: any;
	all: (str: string) => any;
}



