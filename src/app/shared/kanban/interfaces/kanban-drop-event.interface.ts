import { KanbanColumn } from './kanban-interface.class';


export interface KanbanDropEvent {
	item?: any;
	items?: any[];
	from: KanbanColumn;
	to: KanbanColumn;
}
