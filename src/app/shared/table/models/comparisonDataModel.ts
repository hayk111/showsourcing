export class ComparisonDataModel {
	type: 'title' | 'content' | 'header' = 'content';
	title?: string;
	dataType: 'price' | 'text' | 'date' | 'tag' | 'description' | 'image' | 'status' = 'text';
	data?: Array<any> = [];
}
