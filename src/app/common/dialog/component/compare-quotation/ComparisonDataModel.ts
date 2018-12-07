export class ComparisonDataModel {
	type?: 'title' | 'content'| 'header' |'image' = 'content';
	title?: string;
	dataType?: 'price' | 'text' | 'date'| 'tag' |  'description' = 'text';
	data?: Array<any> = [];
}
