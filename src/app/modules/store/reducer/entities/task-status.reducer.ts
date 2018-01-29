import { EntityState, Entity } from '../../utils/entities.utils';
import { TaskStatus } from '../../model/entities/task.model';

const initialState: EntityState<Entity> = {
	pending: false,
	byId: {
		'Todo': { id: 'Todo', name: TaskStatus.TODO },
		'InProgress': { id: 'InProgress', name: TaskStatus.IN_PROGRESS },
		'Done': { id: 'Done', name: TaskStatus.DONE }
	},
	ids: ['Todo', 'InProgress', 'Done']
};

// we are doing a filter for tasks status for convenience for the filter panel
export function tasksStatusReducer( state = initialState, action) {
	return state;
}
