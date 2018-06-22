/** when implementing the interface do not forget to assign static to the variables on the interface */
export interface GlobalQuery {
	one?: any;
	list?: any;
	create?: any;
	update?: any;
	delete?: any;
	all?: (str?: string) => any;
}
