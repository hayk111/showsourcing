import { createSelector } from 'reselect';
import { selectEntities } from '../entity.selector';

export const selectEventsState = createSelector(selectEntities, state => state.event);

export const selectEvents = createSelector(selectEventsState, state => state.byId);

export const selectEventsList = createSelector(selectEvents, events => {
	return Object.keys(events)
		.map(id => event[id])
		.reduce((returned, product) => {
			returned.push(product);
			return returned;
		}, []);
});

export const selectEventById = (id: string) => {
	return createSelector([selectEvents], event => {
		return event[id];
	});
};
