import { TemplateRef } from '@angular/core';
import { ColumnDirective } from '~shared/table';

export interface ColumnDescriptor {
	title: string;
	propName?: string;
	type?: string;
	template?: TemplateRef<ColumnDirective>;
	sortable?: boolean;
	sortBy?: string;
  width?: number;
  minWidth?: number;
}
