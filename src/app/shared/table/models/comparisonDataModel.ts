export class ComparisonDataModel {
	type: 'title' | 'content'| 'header'  = 'content';
	title?: string;
	dataType: 'price' | 'text' | 'date'| 'tag' |  'description' |'image' | 'button' = 'text';
	data?: Array<any> = [];
}
