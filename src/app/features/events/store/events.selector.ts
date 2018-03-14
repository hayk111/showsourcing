import { EventsState } from './events.reducer';
import { EntitiesState } from './';
import { createSelector } from 'reselect';

export const getEntitiesState = state => state.entities;

export const selectEventsState = createSelector(
	getEntitiesState,
	(state: EntitiesState) => state.events
);
export const selectEvents = createSelector(selectEventsState, (state: EventsState) => state.byId);
export const selectEventsList = createSelector(selectEvents, events => {
	return Object.keys(events)
		.map(id => events[id])
		.reduce((returned, product) => {
			returned.push(product);
			return returned;
		}, []);
});

export const selectEventById = (id: string) => {
	return createSelector([selectEvents], events => {
		return events[id];
	});
};
