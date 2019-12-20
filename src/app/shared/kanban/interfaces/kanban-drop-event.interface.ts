import { KanbanColumn } from './kanban-column.class';


export interface KanbanDropEvent {
	item?: any;
	items?: any[];
	from: KanbanColumn;
	to: KanbanColumn;
}
