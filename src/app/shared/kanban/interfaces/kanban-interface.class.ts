
export type KanbanConfig = Map<string, KanbanColumn>;


export class KanbanColumn {
	id: string;
	data?: any[];
	dataMap?: Map<string, any>;
	totalData: number;
	title: string;
	color: string;
}
