import { TemplateRef } from '@angular/core';
import { ColumnDirective } from '~app/shared/table';

export interface ColumnDescriptor {
	title: string;
	propName?: string;
	type?: string;
	template?: TemplateRef<ColumnDirective>;
	sortable?: boolean;
	sortWith?: string;
	width?: number;
}
