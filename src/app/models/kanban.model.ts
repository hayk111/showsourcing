export interface KanbanColumn {
	id: string;
	name: string;
	category: string;
	color: string;
	items: KanbanItem[];
}

export interface KanbanItem {
	id: string;
}
