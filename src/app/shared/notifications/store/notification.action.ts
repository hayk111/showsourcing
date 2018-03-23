import { Notification } from '../model';

export const actionTypes = { ADD: '[Notification] adding' };

export const notificationActions = {
	add: (notification: Notification) => {
		return {
			type: actionTypes.ADD,
			payload: notification,
		};
	},
};
