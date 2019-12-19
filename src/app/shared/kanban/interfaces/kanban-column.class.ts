import { Entity } from '~core/models';
import { SelectionState } from '~shared/inputs-custom/components/select-checkbox/select-checkbox.component';
import { BehaviorSubject } from 'rxjs';

export type KanbanConfig = Map<string, KanbanColumn>;

export interface KanbanColumnConfig {
	id: string;
	data?: any[];
	dataMap?: Map<string, any>;
	totalData: number;
	title: string;
	color: string;
}

export class KanbanColumn {
	// map of id and item selected
	id: string;
	selection = new Map<string, any>();
	private _selection$ = new BehaviorSubject(new Map<string, any>());
	selection$ = this._selection$.asObservable();
	data: any[];
	dataMap?: Map<string, any>;
	totalData: number;
	title: string;
	color: string;

	constructor(config: KanbanColumnConfig) {
		Object.assign(this, config);
	}


	selectOne(item: Entity) {
		this.selection.set(item.id, item);
	}

	unselectOne(item: Entity) {
		this.selection.delete(item.id);
	}

	selectAll() {
		this.data.forEach(elem => this.selection.set(elem.id, elem));
	}

	unselectAll() {
		this.selection = new Map();
	}

	getSelectionState(): SelectionState {
		if (this.data.length === 0 || this.selection.size === 0) {
			return 'unchecked';
		} else if (this.data.length < this.selection.size) {
			return 'selectedPartial';
		} else {
			return 'selectedAll';
		}
	}
}
