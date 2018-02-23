import { User, ActionType } from '@modules/user';
import { TypedAction } from '@modules/store';

export const initialState: User = {
	id: '',
	name: '',
	firstName: '',
	lastName: '',
	email: '',
	creatonDate: 0,
	validated: false,
	preferredLanguage: 'EN',
	currentTeamId: '',
	preferences: {},
	trialUser: false,
	hasPaymentSource: false,
	referralCode: '',
	customerId: '',
	referralUrl: '',
};

export function userReducer(state: User = initialState, action: TypedAction<any> ): User {
	switch (action.type) {
		case ActionType.SET_USER:
			return { ...action.payload, pending: false};
		case ActionType.RESET_USER:
			return initialState;
		default:
			return state;
	}
}
