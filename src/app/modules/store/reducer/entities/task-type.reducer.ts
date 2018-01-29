import { EntityState, Entity } from '../../utils/entities.utils';
import { TaskType } from '../../model/entities/task.model';

const initialState: EntityState<Entity> = {
	pending: false,
	byId: {
		'Catalogue': { id: 'Catalogue', name: TaskType.CATALOGUE },
		'Quotation': { id: 'Quotation', name: TaskType.QUOTATION },
		'Custom': { id: 'Custom', name: TaskType.CUSTOM },
		'Sample': { id: 'Sample', name: TaskType.SAMPLE }
	},
	ids: ['Catalogue', 'Quotation', 'Custom', 'Sample']
};

// we are doing a filter for tasks status for convenience for the filter panel
export function tasksTypeReducer( state = initialState, action) {
	return state;
}
