import { KanbanColumn } from './kanban-column.interface';


export interface KanbanDropEvent {
	item?: any;
	items?: any[];
	from: KanbanColumn;
	to: KanbanColumn;
}
