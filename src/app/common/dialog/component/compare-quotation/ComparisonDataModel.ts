export class ComparisonDataModel {
	type?: 'title' | 'content' = 'content';
	title = '';
	dataType?: 'price' | 'text' | 'date' = 'text';
	data?: Array<any> = [];
}
