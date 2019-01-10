
export type KanbanConfig = Map<string, KanbanColumn>;


export interface KanbanColumn {
	id: string;
	dataMap?: Map<string, any>;
	data?: any[];
	totalData: number;
	title: string;
	color: string;
}
