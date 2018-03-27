import { createSelector } from 'reselect';
import { EntityState } from '~app/shared/entity';
import { Event } from '../models';

export const getEntitiesState = state => state.entities;

export const selectEventsState = createSelector(getEntitiesState, state => state.events);

export const selectEvents = createSelector(selectEventsState, state => state.byId);

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
